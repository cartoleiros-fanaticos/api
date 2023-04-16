<?php

namespace App\Console\Commands;

use App\Http\Controllers\EscalacaoController;
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
use Validator;

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

        $game = Game::first();
        $request = new Request;

        $escalacao_times = EscalacaoTimes::select('id', 'access_token')
            ->get();

        foreach ($escalacao_times as $val) :

            $request->replace(['access_token' => $val->access_token]);

            if ($game->status_mercado === 1) :

                $escalacao = new EscalacaoController;
                $escalacao->store($request);

            else :

                try {

                    $client = new Client();

                    $headers = ['authorization' => 'Bearer ' .  $val->access_token];

                    $response = $client->get("https://api.cartola.globo.com/auth/time/substituicoes", ['headers' => $headers]);
                    $response = json_decode($response->getBody(), true);

                    if (count($response)) :

                        foreach ($response as $value) :

                            DB::UPDATE('
                                UPDATE escalacao_atletas 
                                INNER JOIN escalacao_rodadas ON escalacao_rodadas_id = escalacao_rodadas.id
                                SET entrou_em_campo = "Sim"
                                WHERE atleta_id = ? AND escalacao_times_id = ?
                            ', [$value['entrou']['atleta_id'], $val->id]);

                            DB::UPDATE('
                                UPDATE escalacao_atletas 
                                INNER JOIN escalacao_rodadas ON escalacao_rodadas_id = escalacao_rodadas.id
                                SET entrou_em_campo = "Não"
                                WHERE atleta_id = ? AND escalacao_times_id = ?
                            ', [$value['saiu']['atleta_id'], $val->id]);

                        endforeach;

                    endif;
                } catch (RequestException $e) {
                    echo $e->getMessage() . PHP_EOL;
                    Log::error($e->getMessage());
                } catch (Exception $e) {
                    echo $e->getMessage() . PHP_EOL;
                    Log::error($e->getMessage());
                }

            endif;

        endforeach;
    }
}
