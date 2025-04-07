<?php

namespace App\Console\Commands;

use App\Http\Controllers\EscalacaoController;
use App\Models\EscalacaoAtletas;
use App\Models\EscalacaoRodadas;
use App\Models\EscalacaoTimes;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;
use DB;
use Carbon\Carbon;

class Escalacao extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:escalacao';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando sincroniza os times do cartoleiro fanatico.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

        $temporada = Carbon::now()->format('Y');

        $game = Game::where('temporada', $temporada)
            ->first();

        if ($game) :

            $request = new Request;

            $escalacao_times = EscalacaoTimes::select('id', 'time_id', 'access_token')
                ->where('temporada', $temporada)
                ->get();

            // try {

            echo '- Atualizando times.' . PHP_EOL;

            $client = new Client();

            foreach ($escalacao_times as $val) :

                $id = $val->id;

                if ($game->status_mercado === 1) :

                    if (!is_null($val->access_token)) :

                        $request->replace(['access_token' => $val->access_token]);

                        $escalacao = new EscalacaoController($request);
                        $escalacao->store($request);

                    endif;

                    if ($game->rodada_atual >= 2) :

                        $rodada = ($game->rodada_atual == 38 && $game->game_over == 1) ? 38 : ($game->rodada_atual - 1);

                        $response = $client->get("https://api.cartola.globo.com/time/id/$val->time_id/$rodada");
                        $response = json_decode($response->getBody(), true);

                        DB::transaction(function () use ($response, $temporada) {

                            $time = $response['time'];

                            $escalacao_times = EscalacaoTimes::updateOrCreate(
                                [
                                    'time_id' => $time['time_id'],
                                    'temporada' => $temporada
                                ],
                                [
                                    'nome' => $time['nome'],
                                    'slug' => $time['slug'],
                                    'patrimonio' => $response['patrimonio'],
                                    'pontos_campeonato' => $response['pontos_campeonato'] ?? 0,
                                    'url_escudo_png' => $time['url_escudo_png']
                                ]
                            );

                            if (COLLECT($response['atletas'])->count()) :

                                $escalacao_rodadas = EscalacaoRodadas::updateOrCreate(
                                    [
                                        'escalacao_times_id' => $escalacao_times->id,
                                        'rodada_time_id' => $response['rodada_atual'],
                                        'temporada' => $temporada
                                    ],
                                    [
                                        'capitao_id' => $response['capitao_id'],
                                        'esquema_id' => $response['esquema_id'],
                                        'valor_time' => $response['valor_time'],
                                    ]
                                );

                                EscalacaoAtletas::where('rodada_time_id', $response['rodada_atual'])
                                    ->where('escalacao_rodadas_id', $escalacao_rodadas->id)
                                    ->where('temporada', $temporada)
                                    ->delete();

                                foreach ((array) $response['atletas'] as $key => $val) :

                                    EscalacaoAtletas::create([
                                        'temporada' => $temporada,
                                        'atleta_id' => $val['atleta_id'],
                                        'preco_num' => $val['preco_num'],
                                        'rodada_time_id' => $response['rodada_atual'],
                                        'escalacao_rodadas_id' => $escalacao_rodadas->id,
                                    ]);

                                endforeach;

                                if (isset($response['reservas'])) :

                                    foreach ((array) $response['reservas'] as $key => $val) :

                                        EscalacaoAtletas::create([
                                            'temporada' => $temporada,
                                            'atleta_id' => $val['atleta_id'],
                                            'preco_num' => $val['preco_num'],
                                            'rodada_time_id' => $response['rodada_atual'],
                                            'escalacao_rodadas_id' => $escalacao_rodadas->id,
                                            'titular' => 'Não',
                                            'entrou_em_campo' => 'Não'
                                        ]);

                                    endforeach;

                                endif;

                            endif;
                        }, 3);

                    endif;

                else :

                    $headers = ['authorization' => 'Bearer ' .  $val->access_token];

                    $response = $client->get("https://api.cartola.globo.com/auth/time/substituicoes", ['headers' => $headers]);
                    $response = json_decode($response->getBody(), true);

                    if (isset($response['mensagem']) && $response['mensagem'] === 'Expired'):

                        $headers = ['Content-Type' => 'application/json'];
                        $body = json_encode(['access_token' => $val->access_token]);

                        $auth = $client->post("https://api.cartola.globo.com/refresh", ['timeout' => 180, 'headers' => $headers, 'body' => $body]);
                        $auth = json_decode($auth->getBody(), true);

                        $time = EscalacaoTimes::find($id);
                        $time->access_token = $auth['access_token'];
                        $time->save();

                        $headers = ['authorization' => 'Bearer ' .  $auth['access_token']];

                        $response = $client->get("https://api.cartola.globo.com/auth/time/substituicoes", ['headers' => $headers]);
                        $response = json_decode($response->getBody(), true);

                    endif;

                    if (count($response)) :

                        foreach ($response as $value) :

                            DB::UPDATE('
                                    UPDATE escalacao_atletas 
                                    INNER JOIN escalacao_rodadas ON escalacao_rodadas_id = escalacao_rodadas.id
                                    SET entrou_em_campo = "Sim"
                                    WHERE atleta_id = ? AND escalacao_times_id = ? escalacao_rodadas.temporada = ?
                                ', [$value['entrou']['atleta_id'], $val->id, $temporada]);

                            DB::UPDATE('
                                    UPDATE escalacao_atletas 
                                    INNER JOIN escalacao_rodadas ON escalacao_rodadas_id = escalacao_rodadas.id
                                    SET entrou_em_campo = "Não"
                                    WHERE atleta_id = ? AND escalacao_times_id = ? escalacao_rodadas.temporada = ?
                                ', [$value['saiu']['atleta_id'], $val->id, $temporada]);

                        endforeach;

                    endif;

                endif;

            endforeach;

            echo '- Processo finalizado.' . PHP_EOL . PHP_EOL;

        // } catch (RequestException $e) {
        //     echo $e->getMessage() . PHP_EOL;
        //     Log::error($e->getMessage());
        // } catch (Exception $e) {
        //     echo $e->getMessage() . PHP_EOL;
        //     Log::error($e->getMessage());
        // }

        else :
            echo PHP_EOL . '- Temporada ainda não disponível.' . PHP_EOL . PHP_EOL;
        endif;
    }
}
