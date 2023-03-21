<?php

namespace App\Console\Commands;

use App\Models\Game as ModelsGame;
use App\Models\Partidas;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;

class Game extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:game';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando que atualiza dados do game.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        try {

            echo PHP_EOL . 'Carregando dados do game.' . PHP_EOL;

            $client = new Client();
            $response = $client->get('https://api.cartolafc.globo.com/mercado/status');
            $response = json_decode($response->getBody(), true);

            $dt = $response['fechamento'];

            echo 'Atualizando dados.' . PHP_EOL . PHP_EOL;

            ModelsGame::updateOrCreate(
                [
                    'temporada' => $response['temporada']
                ],
                [
                    'rodada_atual' => $response['rodada_atual'],
                    'status_mercado' => $response['status_mercado'],
                    'game_over' => $response['game_over'],
                    'times_escalados' => $response['times_escalados'],
                    'fechamento' => $dt['ano'] . '-' . $dt['mes'] . '-' . $dt['dia'] . ' ' . $dt['hora'] . ':' . $dt['minuto'],
                ]
            );

            echo 'Carregando dados das partidas.' . PHP_EOL;

            $response = $client->get('https://api.cartolafc.globo.com/partidas');
            $response = json_decode($response->getBody(), true);

            echo 'Atualizando dados.' . PHP_EOL . PHP_EOL;

            foreach ((array) $response['partidas'] as $key => $val) :

                Partidas::updateOrCreate(
                    [
                        'partida_id' => $val['partida_id']
                    ],
                    [
                        'rodada' => $response['rodada'],
                        'clube_casa_id' => $val['clube_casa_id'],
                        'clube_casa_posicao' => $val['clube_casa_posicao'],
                        'clube_visitante_id' => $val['clube_visitante_id'],
                        'clube_visitante_posicao' => $val['clube_visitante_posicao'],
                        'partida_data' => $val['partida_data'],
                        'local' => $val['local'],
                        'aproveitamento_casa_0' => $val['aproveitamento_mandante'][0],
                        'aproveitamento_casa_1' => $val['aproveitamento_mandante'][1],
                        'aproveitamento_casa_2' => $val['aproveitamento_mandante'][2],
                        'aproveitamento_casa_3' => $val['aproveitamento_mandante'][3],
                        'aproveitamento_casa_4' => $val['aproveitamento_mandante'][4],
                        'aproveitamento_fora_0' => $val['aproveitamento_visitante'][0],
                        'aproveitamento_fora_1' => $val['aproveitamento_visitante'][1],
                        'aproveitamento_fora_2' => $val['aproveitamento_visitante'][2],
                        'aproveitamento_fora_3' => $val['aproveitamento_visitante'][3],
                        'aproveitamento_fora_4' => $val['aproveitamento_visitante'][4],
                        'valida' => $val['valida'],
                        'placar_oficial_mandante' => $val['placar_oficial_mandante'],
                        'placar_oficial_visitante' => $val['placar_oficial_visitante'],
                    ]
                );
            endforeach;

        } catch (QueryException $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error('Game: ' . $e->getMessage());
        } catch (RequestException $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error('Game: ' . $e->getMessage());
        } catch (Exception $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error('Game: ' . $e->getMessage());
        }
    }
}
