<?php

namespace App\Console\Commands;

use App\Models\Parciais as ModelsParciais;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;
use DB;

class Parciais extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:parciais';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Alimenta tabela de parciais.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        try {

            echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

            $client = new Client();

            $atletas = Atletas::get()->keyBy('atleta_id');

            $response = $client->get('https://api.cartolafc.globo.com/atletas/pontuados');
            $response = json_decode($response->getBody(), true);

            echo PHP_EOL . '- Atualizando tabela parciais.' . PHP_EOL;

            if (!is_null($response)) :

                foreach ((array) $response['atletas'] as $id => $val) :

                    ModelsParciais::updateOrCreate(
                        [
                            'atleta_id' => $id,
                            'rodada' => $response['rodada']
                        ],
                        [
                            'pontuacao' => $val['pontuacao'],
                            'clube_id' => $val['clube_id'],
                            'posicao_id' => $atletas[$id]->posicao_id,
                            'variacao_num' => 0,
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

                endforeach;

            endif;

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
