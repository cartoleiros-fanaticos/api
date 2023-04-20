<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Models\Parciais;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;

class ParciaisRodadas extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:parciais-rodadas';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Esse comando carrega parciais da rodada anterior.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $game = Game::first();

        $rodada = $game->game_over ? 38 : ($game->rodada_atual > 1 ? ($game->rodada_atual - 1) : 1);

        try {

            echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

            $client = new Client();

            $response = $client->get("https://api.cartolafc.globo.com/atletas/pontuados/$rodada");
            $response = json_decode($response->getBody(), true);

            echo PHP_EOL . '- Atualizando tabela parciais.' . PHP_EOL;

            if (!is_null($response)) :

                foreach ((array) $response['atletas'] as $id => $val) :

                    Parciais::updateOrCreate(
                        [
                            'atleta_id' => $id,
                            'rodada' => $response['rodada']
                        ],
                        [
                            'pontuacao' => $val['pontuacao'],
                            'clube_id' => $val['clube_id'],
                            'entrou_em_campo' => $val['entrou_em_campo'] ? 'Sim' : 'Não',
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
                            'V' => (isset($val['scout']['V']) ? $val['scout']['V'] : 0),
                        ]
                    );

                endforeach;

            endif;

            echo '- Sucesso na atualizacao.' . PHP_EOL . PHP_EOL;
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
