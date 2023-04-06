<?php

namespace App\Console\Commands;

use App\Models\Atletas as ModelsAtletas;
use App\Models\Clubes;
use App\Models\Posicoes;
use App\Models\Status;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;

class Atletas extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:atletas';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando que atualiza dados dos atletas.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        try {

            echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

            $client = new Client();
            $response = $client->get('https://api.cartolafc.globo.com/atletas/mercado');
            $response = json_decode($response->getBody(), true);

            echo '- Atualizando tabela clubes.' . PHP_EOL;

            foreach ((array) $response['clubes'] as $key => $val) :

                Clubes::updateOrCreate(
                    [
                        'id' => $val['id']
                    ],
                    [
                        'nome' => $val['nome'],
                        'abreviacao' => $val['abreviacao'],
                        'escudo' => 'data:image/png;base64,' . base64_encode(file_get_contents($val['escudos']['60x60'])),
                        '60x60' => $val['escudos']['60x60'],
                        '45x45' => $val['escudos']['45x45'],
                        '30x30' => $val['escudos']['30x30']
                    ]
                );

            endforeach;

            echo '- Atualizando tabela posicoes.' . PHP_EOL;

            foreach ((array) $response['posicoes'] as $key => $val) :

                Posicoes::updateOrCreate(
                    [
                        'id' => $val['id']
                    ],
                    [
                        'nome' => $val['nome'],
                        'abreviacao' => $val['abreviacao']
                    ]
                );
            endforeach;

            echo '- Atualizando tabela status.' . PHP_EOL;

            foreach ((array) $response['status'] as $key => $val) :

                Status::updateOrCreate(
                    [
                        'id' => $val['id']
                    ],
                    [
                        'nome' => $val['nome']
                    ]
                );

            endforeach;

            echo '- Atualizando tabela atletas.' . PHP_EOL;

            foreach ((array) $response['atletas'] as $key => $val) :

                if ($val['clube_id'] != 1) :

                    ModelsAtletas::updateOrCreate(
                        [
                            'atleta_id' => $val['atleta_id']
                        ],
                        [
                            'nome' => $val['nome'],
                            'slug' => $val['slug'],
                            'apelido' => $val['apelido'],
                            'foto' => str_replace('FORMATO', '220x220', $val['foto']),
                            'rodada_id' => $val['rodada_id'],
                            'clube_id' => $val['clube_id'],
                            'posicao_id' => $val['posicao_id'],
                            'status_id' => $val['status_id'],
                            'pontos_num' => $val['pontos_num'],
                            'preco_num' => $val['preco_num'],
                            'variacao_num' => $val['variacao_num'],
                            'media_num' => $val['media_num'],
                            'jogos_num' => $val['jogos_num'],
                            'DS' => (isset($val['scout']['DS']) ? $val['scout']['DS'] : 0),
                            'FC' => (isset($val['scout']['FC']) ? $val['scout']['FC'] : 0),
                            'GC' => (isset($val['scout']['GC']) ? $val['scout']['GC'] : 0),
                            'CA' => (isset($val['scout']['CA']) ? $val['scout']['CA'] : 0),
                            'CV' => (isset($val['scout']['CV']) ? $val['scout']['CV'] : 0),
                            'SG' => (isset($val['scout']['SG']) ? $val['scout']['SG'] : 0),
                            'DP' => (isset($val['scout']['DP']) ? $val['scout']['DP'] : 0),
                            'GS' => (isset($val['scout']['GS']) ? $val['scout']['GS'] : 0),
                            'FS' => (isset($val['scout']['FS']) ? $val['scout']['FS'] : 0),
                            'A' => (isset($val['scout']['A']) ? $val['scout']['A'] : 0),
                            'FT' => (isset($val['scout']['FT']) ? $val['scout']['FT'] : 0),
                            'FD' => (isset($val['scout']['FD']) ? $val['scout']['FD'] : 0),
                            'FF' => (isset($val['scout']['FF']) ? $val['scout']['FF'] : 0),
                            'G' => (isset($val['scout']['G']) ? $val['scout']['G'] : 0),
                            'I' => (isset($val['scout']['I']) ? $val['scout']['I'] : 0),
                            'PP' => (isset($val['scout']['PP']) ? $val['scout']['PP'] : 0),
                            'PS' => (isset($val['scout']['PS']) ? $val['scout']['PS'] : 0),
                            'PC' => (isset($val['scout']['PC']) ? $val['scout']['PC'] : 0),
                            'DE' => (isset($val['scout']['DE']) ? $val['scout']['DE'] : 0),
                        ]
                    );
                endif;
            endforeach;

            echo '- Sucesso na atualizacao.' . PHP_EOL . PHP_EOL;

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
