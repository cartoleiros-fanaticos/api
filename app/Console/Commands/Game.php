<?php

namespace App\Console\Commands;

use App\Models\Config;
use App\Models\Destaques;
use App\Models\Game as ModelsGame;
use App\Models\Partidas;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;
use Carbon\Carbon;

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

            echo PHP_EOL . '- Carregando dados do game.' . PHP_EOL;

            $client = new Client();
            $response = $client->get('https://api.cartolafc.globo.com/mercado/status');
            $response = json_decode($response->getBody(), true);

            $ano_atual = Carbon::now()->format('Y');
            $temporada = $response['temporada'];

            if ($temporada == $ano_atual) :
                
                $dt = $response['fechamento'];
                $rodada_atual = $response['rodada_atual'];

                ModelsGame::updateOrCreate(
                    [
                        'temporada' => $temporada
                    ],
                    [
                        'rodada_atual' => $response['rodada_atual'],
                        'status_mercado' => $response['status_mercado'],
                        'game_over' => $response['game_over'],
                        'times_escalados' => $response['times_escalados'],
                        'fechamento' => $dt['ano'] . '-' . $dt['mes'] . '-' . $dt['dia'] . ' ' . $dt['hora'] . ':' . $dt['minuto'],
                    ]
                );

                echo '- Carregando dados das partidas.' . PHP_EOL;

                $response = $client->get('https://api.cartolafc.globo.com/partidas');
                $response = json_decode($response->getBody(), true);

                foreach ((array) $response['partidas'] as $key => $val) :

                    Partidas::updateOrCreate(
                        [
                            'partida_id' => $val['partida_id'],
                            'temporada' => $temporada,
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
                            'placar_oficial_mandante' => $val['placar_oficial_mandante'] ?? 0,
                            'placar_oficial_visitante' => $val['placar_oficial_visitante'] ?? 0,
                        ]
                    );
                endforeach;

                echo '- Carregando dados dos mais escalados.' . PHP_EOL;

                $config = Config::first();

                $headers = ['authorization' => 'Bearer ' . $config->cartola_access_token];

                $response = $client->get('https://api.cartola.globo.com/auth/mercado/destaques', ['headers' => $headers]);
                $response = json_decode($response->getBody(), true);

                foreach ((array) $response as $key => $val) :

                    Destaques::updateOrCreate(
                        [
                            'temporada' => $temporada,
                            'atleta_id' => $val['Atleta']['atleta_id'],
                            'rodada' => $rodada_atual,
                            'tipo' => 'Seleção',
                        ],
                        [
                            'apelido' => $val['Atleta']['apelido'],
                            'posicao' => $val['posicao'],
                            'foto' => str_replace('FORMATO', '220x220', $val['Atleta']['foto']),
                            'escalacoes' => $val['escalacoes'],
                        ]
                    );

                endforeach;

                echo '- Carregando dados dos reservas mais escalados.' . PHP_EOL;

                $response = $client->get('https://api.cartola.globo.com/auth/mercado/destaques/reservas', ['headers' => $headers]);
                $response = json_decode($response->getBody(), true);

                foreach ((array) $response as $key => $val) :
                    Destaques::updateOrCreate(
                        [
                            'temporada' => $temporada,
                            'atleta_id' => $val['Atleta']['atleta_id'],
                            'rodada' => $rodada_atual,
                            'tipo' => 'Reservas',
                        ],
                        [
                            'apelido' => $val['Atleta']['apelido'],
                            'posicao' => $val['posicao'],
                            'foto' => str_replace('FORMATO', '220x220', $val['Atleta']['foto']),
                            'escalacoes' => $val['escalacoes'],
                        ]
                    );

                endforeach;

                echo '- Carregando dados dos capitães mais escalados.' . PHP_EOL;

                $response = $client->get('https://api.cartola.globo.com/mercado/selecao');
                $response = json_decode($response->getBody(), true);

                foreach ((array) $response['capitaes'] as $key => $val) :

                    Destaques::updateOrCreate(
                        [
                            'temporada' => $temporada,
                            'atleta_id' => $val['Atleta']['atleta_id'],
                            'rodada' => $rodada_atual,
                            'tipo' => 'Capitães',
                        ],
                        [
                            'apelido' => $val['Atleta']['apelido'],
                            'posicao' => $val['posicao'],
                            'foto' => str_replace('FORMATO', '220x220', $val['Atleta']['foto']),
                            'escalacoes' => $val['escalacoes'],
                        ]
                    );

                endforeach;

                echo '- Sucesso na atualizacao.' . PHP_EOL;

            else :

                echo '- Atemporada não iniciou.' . PHP_EOL;

            endif;
        } catch (QueryException $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error($e->getMessage());
        } catch (RequestException $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error($e->getMessage());
        } catch (Exception $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error($e->getMessage());
        }
    }
}
