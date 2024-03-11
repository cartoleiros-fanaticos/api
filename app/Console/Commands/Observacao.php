<?php

namespace App\Console\Commands;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Game;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
use Exception;
use Log;
use DB;

class Observacao extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:observacao';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Atualiza coluna observação dos atletas.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        try {

            $temporada = Carbon::now()->format('Y');

            $game = Game::where('temporada', $temporada)
                ->first();

            if ($game) :

                echo PHP_EOL . '- Carregando dados.' . PHP_EOL;

                $client = new Client();
                $response = $client->get('https://api.cartolafc.globo.com/atletas/mercado');
                $response = json_decode($response->getBody(), true);

                echo '- Gerando observação dos atletas.' . PHP_EOL;


                $clubes = Clubes::where('temporada', $temporada)
                    ->get()
                    ->keyBy('id');

                DB::statement('CREATE TEMPORARY TABLE partidas_mandante_temporary  
                ( 
                    SELECT
                        p1.rodada,
                        p1.clube_casa_id as clube_id
                    FROM partidas p1
                    INNER JOIN ( 
                        SELECT 
                            clube_casa_id,
                            GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                        FROM partidas
                        WHERE valida = 1 AND rodada != ' . $game->rodada_atual . ' AND temporada = ' . $temporada . '
                        GROUP BY clube_casa_id
                    ) p2 ON p2.clube_casa_id = p1.clube_casa_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= 3
                    WHERE valida = 1 AND rodada != ' . $game->rodada_atual . ' AND temporada = ' . $temporada . '
                    ORDER BY 
                        p1.clube_casa_id
                );
            ');

                DB::statement('CREATE TEMPORARY TABLE partidas_visitante_temporary  
                ( 
                    SELECT
                        p1.rodada,
                        p1.clube_visitante_id as clube_id
                    FROM partidas p1
                    INNER JOIN ( 
                        SELECT 
                            clube_visitante_id,
                            GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                        FROM partidas
                        WHERE valida = 1 AND rodada != ' . $game->rodada_atual . ' AND temporada = ' . $temporada . '
                        GROUP BY clube_visitante_id
                    ) p2 ON p2.clube_visitante_id = p1.clube_visitante_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= 3
                    WHERE valida = 1 AND rodada != ' . $game->rodada_atual . ' AND temporada = ' . $temporada . '
                    ORDER BY 
                        p1.clube_visitante_id
                );
            ');

                $mandante_rodada_id = COLLECT(DB::SELECT('
                SELECT 
                    rodada,
                    clube_id
                FROM partidas_mandante_temporary
            '))->groupBy('clube_id');

                $visitante_rodada_id = COLLECT(DB::SELECT('
                SELECT 
                    rodada,
                    clube_id
                FROM partidas_visitante_temporary
            '))->groupBy('clube_id');

                foreach ((array) $response['atletas'] as $key => $val) :

                    $partida = DB::SELECT('
                    SELECT 
                        (
                            CASE 
                                WHEN clube_casa_id = ? THEN \'mandante\' 
                                ELSE \'visitante\'
                            END
                        ) as posicao,
                        (
                            CASE 
                                WHEN clube_casa_id = ? THEN clube_visitante_id
                                ELSE clube_casa_id
                            END
                        ) as adversario_id
                    FROM partidas
                    WHERE rodada = ? AND (clube_casa_id = ? OR clube_visitante_id = ?) AND valida = 1 AND temporada = ?
                 ', [$val['clube_id'], $val['clube_id'], $game->rodada_atual, $val['clube_id'], $val['clube_id'], $temporada])[0];

                    if ($partida->posicao === 'mandante') :

                        $parciais = DB::SELECT('
                        SELECT 
                            ROUND(IFNULL(AVG(pontuacao), 0), 2) as pontuacao
                        FROM parciais                        
                        WHERE atleta_id = ? AND parciais.rodada IN (' .  $mandante_rodada_id[$val['clube_id']]->pluck('rodada')->implode(',') . ') AND temporada = ?
                    ', [$val['atleta_id'], $temporada])[0];

                        $max_pontuacao = DB::SELECT('
                        SELECT 
                            ROUND(IFNULL(MAX(pontuacao), 0), 2) pontos
                        FROM parciais
                        WHERE atleta_id = ? AND rodada IN (SELECT rodada FROM partidas WHERE valida = 1 AND clube_casa_id IN (clube_id)) AND temporada = ?
                    ', [$val['atleta_id'], $temporada])[0];

                        $min_pontuacao = DB::SELECT('
                        SELECT 
                            ROUND(IFNULL(MIN(pontuacao), 0), 2) pontos
                        FROM parciais
                        WHERE atleta_id = ? AND rodada IN (SELECT rodada FROM partidas WHERE valida = 1 AND clube_casa_id IN (clube_id)) AND temporada = ?
                    ', [$val['atleta_id'], $temporada])[0];

                    else :

                        $parciais = DB::SELECT('
                        SELECT 
                            ROUND(IFNULL(AVG(pontuacao), 0), 2) as pontuacao
                        FROM parciais                        
                        WHERE atleta_id = ? AND parciais.rodada IN (' .  $visitante_rodada_id[$val['clube_id']]->pluck('rodada')->implode(',') . ') AND temporada = ?
                    ', [$val['atleta_id'], $temporada])[0];

                        $max_pontuacao = DB::SELECT('
                        SELECT 
                            ROUND(IFNULL(MAX(pontuacao), 0), 2) pontos
                        FROM parciais
                        WHERE atleta_id = ? AND rodada IN (SELECT rodada FROM partidas WHERE valida = 1 AND clube_visitante_id IN (clube_id)) AND temporada = ?
                    ', [$val['atleta_id'], $temporada])[0];

                        $min_pontuacao = DB::SELECT('
                        SELECT 
                            ROUND(IFNULL(MIN(pontuacao), 0), 2) pontos
                        FROM parciais
                        WHERE atleta_id = ? AND rodada IN (SELECT rodada FROM partidas WHERE valida = 1 AND clube_visitante_id IN (clube_id)) AND temporada = ?
                    ', [$val['atleta_id'], $temporada])[0];

                    endif;

                    if (COLLECT($parciais)->count()) :

                        $observacao = 'O jogador ' . $val['apelido'] . ' nos últimos 3 jogos como ' . $partida->posicao . ' tem uma média de ' . $parciais->pontuacao . ' pontos, nesta rodada ele joga contra ( ' . $clubes[$partida->adversario_id]->nome . ' ) a maior nota dele como ' . $partida->posicao . ' foi ' . $max_pontuacao->pontos . ' pontos e a menor foi ' . $min_pontuacao->pontos . ' pontos.';

                        Atletas::where('atleta_id', $val['atleta_id'])
                            ->where('temporada', $temporada)
                            ->update([
                                'observacao' => $observacao
                            ]);

                    endif;

                endforeach;

                DB::statement('DROP TEMPORARY TABLE partidas_mandante_temporary;');
                DB::statement('DROP TEMPORARY TABLE partidas_visitante_temporary;');

                echo '- Sucesso na atualizacao.' . PHP_EOL . PHP_EOL;

            else :
                echo PHP_EOL . '- Temporada ainda não disponível.' . PHP_EOL . PHP_EOL;
            endif;
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
