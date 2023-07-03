<?php

namespace App\Console\Commands;

use App\Http\Controllers\ParciaisController;
use App\Models\Competicoes;
use App\Models\CompeticoesAtletas;
use App\Models\CompeticoesRodadas;
use App\Models\CompeticoesTimes;
use App\Models\Game;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use Exception;
use Log;

class Competicao extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:competicao';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando que atualiza dados das ligas';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $game = Game::first();

        $rodada_atual = $game->rodada_atual;

        //$game->status_mercado = 1;

        echo PHP_EOL . '- Encerrando competições.' . PHP_EOL;

        Competicoes::where('situacao', '!=', 'Encerrada')
            ->where('ate', '<', $rodada_atual)
            ->update([
                'situacao' => 'Encerrada'
            ]);

        echo '- Carregando times.' . PHP_EOL;

        $times = CompeticoesTimes::select('competicoes_times.id', 'time_id', 'competicoes_transacoes.competicoes_id', 'competicoes.situacao')
            ->join('competicoes_transacoes', 'competicoes_transacoes.competicoes_times_id', 'competicoes_times.id')
            ->join('competicoes', 'competicoes_transacoes.competicoes_id', 'competicoes.id')
            ->where('competicoes_transacoes.situacao', 'Aceita')
             ->where('de', '>=', $rodada_atual)
            //->where('ate', '<=', $rodada_atual)
            ->where('competicoes.situacao', '!=', 'Encerrada')
            ->get()
            ->keyBy('time_id');

        echo '- Deletando atletas da rodada anterior.' . PHP_EOL;

        CompeticoesAtletas::where('rodada', $rodada_atual)
            ->forceDelete();

        if (COLLECT($times)->count()) :

            try {

                echo '- Carregando times do site do cartola.' .  PHP_EOL;

                $client = new Client();

                $teams = [];

                foreach ($times as $key => $val) :

                    if (!isset($teams[$key])) :

                        echo  "- Atualizando tabela times_cartolas ID: $val->time_id." . PHP_EOL;

                        $parciais = new ParciaisController;
                        $response = $parciais->parciais_time($val->time_id);

                        //   $teams[$key] = $val;

                    endif;

                    if ($game->status_mercado != 1) :

                        if ($val->situacao === 'Em andamento') :

                            if (!isset($teams[$key])) :

                                $response = $client->get("https://api.cartolafc.globo.com/time/id/$val->time_id");
                                $response = json_decode($response->getBody(), true);

                                $data = [];

                                if (isset($response['atletas'])) :

                                    $i = 0;

                                    foreach ($response['atletas'] as $value) :

                                        $data[$i]['rodada'] = $game->rodada_atual;
                                        $data[$i]['atleta_id'] = $value['atleta_id'];
                                        $data[$i]['competicoes_times_id'] = $val->id;

                                        $i++;

                                    endforeach;

                                    CompeticoesAtletas::insert($data);

                                endif;

                             //   $teams[$key] = $val;

                                echo  PHP_EOL . '- Time ' . $response['time']['nome'] . ' carregado e atualizado.' . PHP_EOL;

                            endif;

                        else :

                            echo '- Atualizando tabela competições.' .  PHP_EOL;

                            $competicao = Competicoes::find($val->competicoes_id);
                            $competicao->situacao = 'Em andamento';
                            $competicao->save();

                        endif;

                    else :

                        echo  '- Criando ou atualizando registro nova rodada.' . PHP_EOL;

                        CompeticoesRodadas::updateOrCreate(
                            [
                                'rodada' => $game->rodada_atual,
                                'competicoes_id' => $val->competicoes_id,
                                'competicoes_times_id' =>  $val->id
                            ],
                            []
                        );

                    endif;

                    $teams[$key] = $val;

                endforeach;
            } catch (Exception $e) {
                echo PHP_EOL . $e->getMessage() . PHP_EOL;
                Log::error($e->getMessage());
            }
        endif;

        echo '- Concluido' . PHP_EOL . PHP_EOL;
    }
}
