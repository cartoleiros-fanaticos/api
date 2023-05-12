<?php

namespace App\Http\Controllers;

use App\Models\Clubes;
use App\Models\Game;
use App\Models\Partidas;
use Illuminate\Http\Request;
use DB;
use Mockery\Undefined;

class CruzamentoController extends Controller
{
    public function index(Request $request)
    {

        $game = Game::first();

        $tipo = $request->input('tipo', 'scouts');
        $scout = $request->input('scout', 'G');
        $posicao_id = $request->input('posicao_id', null);
        $ultimas_rodadas = $request->input('ultimas_rodadas', 38);
        $total = $request->input('total', 'Não');

        $rodada_atual = $game->rodada_atual;

        $partidas = Partidas::select('clube_casa_id', 'clube_visitante_id')
            ->where('rodada', $rodada_atual)
            ->get();

        $clubes = Clubes::select('id', 'escudo')
            ->get()
            ->keyBy('id');

        if ($tipo === 'scouts')
            $data = $this->scouts($scout, $posicao_id, $ultimas_rodadas, $total, $rodada_atual);
        else if ($tipo === 'pontos')
            $data = $this->pontos($posicao_id, $ultimas_rodadas, $total, $rodada_atual);
        else if ($tipo === 'media')
            $data = $this->media($posicao_id, $ultimas_rodadas, $total, $rodada_atual);

        return response()->json([
            'rodada_atual' => $rodada_atual,
            'data' => $data,
            'partidas' => $partidas,
            'clubes' => $clubes,
        ]);
    }

    public function scouts($scout, $posicao_id, $ultimas_rodadas, $total, $rodada_atual)
    {

        DB::statement('CREATE TEMPORARY TABLE partidas_temporary  
            ( 
                SELECT
                    p1.rodada,
                    p1.clube_casa_id
                FROM partidas p1
                INNER JOIN ( 
                    SELECT 
                        clube_casa_id,
                        GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                    FROM partidas
                    WHERE rodada < ' . $rodada_atual . '
                    GROUP BY clube_casa_id
                ) p2 ON p2.clube_casa_id = p1.clube_casa_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                WHERE rodada < ' . $rodada_atual . '
                ORDER BY 
	                p1.clube_casa_id
            );
        ', [$ultimas_rodadas]);

        if ($total === 'Não') :

            $conquista_casa = COLLECT(DB::SELECT('
                SELECT 
                    clube_casa_id id,    
                    (
                        CASE 
                            WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                SELECT 
                                    SUM(IF(SG > 0, 1, 0))
                                FROM (
                                    SELECT  
                                        SUM(SG) SG 
                                    FROM parciais p 
                                    INNER JOIN partidas p1 ON clube_id = clube_casa_id AND p.rodada = p1.rodada
                                    WHERE clube_id = partidas.clube_casa_id
                                    GROUP BY p.rodada
                                ) A
                            )                           
                            ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                        END
                    ) pontos
                FROM partidas
                INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id )
                WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
                GROUP BY clube_casa_id
                ORDER BY clube_casa_id
            '))->keyBy('id');

            $cedidas_casa = COLLECT(DB::SELECT('
                SELECT 
                    clube_casa_id id,   
                    (
                        CASE 
                            WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                SELECT 
                                    SUM(IF((SELECT SUM(SG) FROM parciais WHERE clube_id = clube_visitante_id AND rodada = p1.rodada) > 0, 1, 0))	
                                FROM partidas p1
                                WHERE clube_casa_id = partidas.clube_casa_id
                            )                           
                            ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                        END
                    ) pontos
                FROM partidas
                INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id ) 
                WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
                GROUP BY clube_casa_id
                ORDER BY clube_casa_id
            '))->keyBy('id');

        else :

            $rodada = ($rodada_atual - $ultimas_rodadas) > 0 ? ($rodada_atual - $ultimas_rodadas) : 1;

            $conquista_casa = COLLECT(DB::SELECT('
                SELECT 
                    clube_id id,
                    (
                        CASE 
                            WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                SELECT 
                                    SUM(IF(SG > 0, 1, 0))
                                FROM (
                                    SELECT  
                                        SUM(SG) SG 
                                    FROM parciais p 
                                    WHERE clube_id = parciais.clube_id
                                    GROUP BY p.rodada
                                ) A
                            )                           
                            ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                        END
                    ) pontos
                FROM parciais
                WHERE posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND rodada >= ?
                GROUP BY clube_id
            ', [$rodada]))->keyBy('id');

            $cedidas_casa = COLLECT(DB::SELECT('
                SELECT
                    clube_casa_id AS id,
                    (
                        (
                            SELECT 
                                (
                                    CASE 
                                        WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                            SELECT 
                                                SUM(IF((SELECT SUM(SG) FROM parciais WHERE clube_id = clube_casa_id AND rodada = p1.rodada) > 0, 1, 0))	
                                            FROM partidas p1
                                            WHERE clube_visitante_id = partidas.clube_visitante_id
                                        )                           
                                        ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                                    END
                                )
                            FROM partidas
                            INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                            WHERE clube_visitante_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_visitante_id
                        )
                        +
                        (
                            SELECT 
                                (
                                    CASE 
                                        WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                            SELECT 
                                                SUM(IF((SELECT SUM(SG) FROM parciais WHERE clube_id = clube_visitante_id AND rodada = p1.rodada) > 0, 1, 0))	
                                            FROM partidas p1
                                            WHERE clube_casa_id = partidas.clube_casa_id
                                        )                           
                                        ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                                    END
                                )
                            FROM partidas
                            INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                            WHERE clube_casa_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_casa_id
                        )
                    ) pontos
                FROM partidas
                INNER JOIN clubes ON clube_casa_id = clubes.id
                INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                WHERE posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND partidas.rodada >= ?
                GROUP BY clube_casa_id
            ', [$rodada]))->keyBy('id');

        endif;

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        DB::statement('CREATE TEMPORARY TABLE partidas_temporary  
            ( 
                SELECT
                    p1.rodada,
                    p1.clube_visitante_id
                FROM partidas p1
                INNER JOIN ( 
                SELECT 
                    clube_visitante_id,
                    GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                FROM partidas
                WHERE rodada < ' . $rodada_atual . '
                GROUP BY clube_visitante_id
                ) p2 ON p2.clube_visitante_id = p1.clube_visitante_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                WHERE rodada < ' . $rodada_atual . '
                ORDER BY 
                    p1.clube_visitante_id
            );
        ', [$ultimas_rodadas]);

        if ($total === 'Não') :

            $conquista_fora = COLLECT(DB::SELECT('
                SELECT 
                    clube_visitante_id id,
                    (
                        CASE 
                            WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                SELECT 
                                    SUM(IF(SG > 0, 1, 0))
                                FROM (
                                    SELECT  
                                        SUM(SG) SG 
                                    FROM parciais p 
                                    INNER JOIN partidas p1 ON clube_id = clube_visitante_id AND p.rodada = p1.rodada
                                    WHERE clube_id = partidas.clube_visitante_id
                                    GROUP BY p.rodada
                                ) A
                            )                           
                            ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                        END
                    ) pontos
                FROM partidas
                INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id )
                WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
                GROUP BY clube_visitante_id
                ORDER BY clube_visitante_id
            '))->keyBy('id');

            $cedidas_fora = COLLECT(DB::SELECT('
                SELECT 
                    clube_visitante_id id, 
                    (
                        CASE 
                            WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                SELECT 
                                    SUM(IF((SELECT SUM(SG) FROM parciais WHERE clube_id = clube_casa_id AND rodada = p1.rodada) > 0, 1, 0))	
                                FROM partidas p1
                                WHERE clube_visitante_id = partidas.clube_visitante_id
                            )                           
                            ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                        END
                    ) pontos
                FROM partidas
                INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id ) 
                WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
                GROUP BY clube_visitante_id
                ORDER BY clube_visitante_id
            '))->keyBy('id');

        else :

            $rodada = ($rodada_atual - $ultimas_rodadas) > 0 ? ($rodada_atual - $ultimas_rodadas) : 1;

            $conquista_fora = COLLECT(DB::SELECT('
                SELECT 
                    clube_id id,
                    (
                        CASE 
                            WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                SELECT 
                                    SUM(IF(SG > 0, 1, 0))
                                FROM (
                                    SELECT  
                                        SUM(SG) SG 
                                    FROM parciais p 
                                    WHERE clube_id = parciais.clube_id
                                    GROUP BY p.rodada
                                ) A
                            )                           
                            ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                        END
                    ) pontos
                FROM parciais
                WHERE posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND rodada >= ?
                GROUP BY clube_id
            ', [$rodada]))->keyBy('id');

            $cedidas_fora = COLLECT(DB::SELECT('
                SELECT
                    clube_visitante_id AS id,
                    (
                        (
                            SELECT 
                            (
                                CASE 
                                    WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                        SELECT 
                                            SUM(IF((SELECT SUM(SG) FROM parciais WHERE clube_id = clube_casa_id AND rodada = p1.rodada) > 0, 1, 0))	
                                        FROM partidas p1
                                        WHERE clube_visitante_id = partidas.clube_visitante_id
                                    )                           
                                    ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                                END
                            )
                            FROM partidas
                            INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                            WHERE clube_visitante_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_visitante_id
                        )
                        +
                        (
                            SELECT 
                                (
                                    CASE 
                                        WHEN ' . ($scout === 'SG' ? 'TRUE' : 'FALSE') . ' THEN (
                                            SELECT 
                                                SUM(IF((SELECT SUM(SG) FROM parciais WHERE clube_id = clube_visitante_id AND rodada = p1.rodada) > 0, 1, 0))	
                                            FROM partidas p1
                                            WHERE clube_casa_id = partidas.clube_casa_id
                                        )                           
                                        ELSE IFNULL(SUM(' . ($scout === 'F' ? 'FT + FD + FF + G' : $scout) . '), 0)
                                    END
                                )
                            FROM partidas
                            INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                            WHERE clube_casa_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_casa_id
                        )
                    ) pontos
                FROM partidas
                INNER JOIN clubes ON clube_visitante_id = clubes.id
                INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                WHERE posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND partidas.rodada >= ?
                GROUP BY clube_visitante_id
            ', [$rodada]))->keyBy('id');

        endif;

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        return [
            'conquista_casa' => $conquista_casa,
            'cedidas_casa' => $cedidas_casa,
            'conquista_fora' => $conquista_fora,
            'cedidas_fora' => $cedidas_fora,
        ];
    }

    public function pontos($posicao_id, $ultimas_rodadas, $total, $rodada_atual)
    {

        DB::statement('CREATE TEMPORARY TABLE partidas_temporary  
            ( 
                SELECT
                    p1.rodada,
                    p1.clube_casa_id
                FROM partidas p1
                INNER JOIN ( 
                    SELECT 
                        clube_casa_id,
                        GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                    FROM partidas
                    WHERE rodada < ' . $rodada_atual . '
                    GROUP BY clube_casa_id
                ) p2 ON p2.clube_casa_id = p1.clube_casa_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                WHERE rodada < ' . $rodada_atual . '
                ORDER BY 
	                p1.clube_casa_id
            );
        ', [$ultimas_rodadas]);

        $rodada = ($rodada_atual - $ultimas_rodadas) > 0 ? ($rodada_atual - $ultimas_rodadas) : 1;

        $conquista_casa = COLLECT(DB::SELECT('
            SELECT 
                clube_casa_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            SELECT 
                                IFNULL(SUM(pontuacao), 0) 
                            FROM parciais
                            WHERE clube_id = clube_casa_id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_id
                        )
                        ELSE IFNULL(SUM(pontuacao), 0) 
                    END
                ) pontos
            FROM partidas
            INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id )
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_casa_id
            ORDER BY clube_casa_id
        '))->keyBy('id');

        $cedidas_casa = COLLECT(DB::SELECT('
            SELECT 
                clube_casa_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            (
                                SELECT 
                                    IFNULL(SUM(pontuacao), 0) 
                                FROM partidas
                                INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_visitante_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                                GROUP BY clube_visitante_id
                            )
                            +
                            (
                                SELECT 
                                    IFNULL(SUM(pontuacao), 0) 
                                FROM partidas
                                INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_casa_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                                GROUP BY clube_casa_id
                            )
                        )
                        ELSE IFNULL(SUM(pontuacao), 0) 
                    END
                ) pontos
            FROM partidas
            INNER JOIN clubes ON clube_casa_id = clubes.id
            INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id ) 
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_casa_id
            ORDER BY clube_casa_id
        '))->keyBy('id');

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        DB::statement('CREATE TEMPORARY TABLE partidas_temporary  
            ( 
                SELECT
                    p1.rodada,
                    p1.clube_visitante_id
                FROM partidas p1
                INNER JOIN ( 
                SELECT 
                    clube_visitante_id,
                    GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                FROM partidas
                WHERE rodada < ' . $rodada_atual . '
                GROUP BY clube_visitante_id
                ) p2 ON p2.clube_visitante_id = p1.clube_visitante_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                WHERE rodada < ' . $rodada_atual . '
                ORDER BY 
                    p1.clube_visitante_id
            );
        ', [$ultimas_rodadas]);

        $conquista_fora = COLLECT(DB::SELECT('
            SELECT 
                clube_visitante_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            SELECT 
                                IFNULL(SUM(pontuacao), 0) 
                            FROM parciais
                            WHERE clube_id = clube_visitante_id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_id
                        )
                        ELSE IFNULL(SUM(pontuacao), 0) 
                    END
                ) pontos
            FROM partidas
            INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id )
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_visitante_id
            ORDER BY clube_visitante_id
        '))->keyBy('id');

        $cedidas_fora = COLLECT(DB::SELECT('
            SELECT 
                clube_visitante_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            (
                                SELECT 
                                    IFNULL(SUM(pontuacao), 0) 
                                FROM partidas
                                INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_visitante_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                                GROUP BY clube_visitante_id
                            )
                            +
                            (
                                SELECT 
                                    IFNULL(SUM(pontuacao), 0) 
                                FROM partidas
                                INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_casa_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                                GROUP BY clube_casa_id
                            )
                        )
                        ELSE IFNULL(SUM(pontuacao), 0) 
                    END
                ) pontos
            FROM partidas
            INNER JOIN clubes ON clube_visitante_id = clubes.id
            INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id ) 
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_visitante_id
            ORDER BY clube_visitante_id
        '))->keyBy('id');

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        return [
            'conquista_casa' => $conquista_casa,
            'cedidas_casa' => $cedidas_casa,
            'conquista_fora' => $conquista_fora,
            'cedidas_fora' => $cedidas_fora,
        ];
    }

    public function media($posicao_id, $ultimas_rodadas = 38, $total = 'Sim', $rodada_atual)
    {

        DB::statement('CREATE TEMPORARY TABLE partidas_temporary  
            ( 
                SELECT
                    p1.rodada,
                    p1.clube_casa_id
                FROM partidas p1
                INNER JOIN ( 
                    SELECT 
                        clube_casa_id,
                        GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                    FROM partidas
                    WHERE rodada < ' . $rodada_atual . '
                    GROUP BY clube_casa_id
                ) p2 ON p2.clube_casa_id = p1.clube_casa_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                WHERE rodada < ' . $rodada_atual . '
                ORDER BY 
	                p1.clube_casa_id
            );
        ', [$ultimas_rodadas]);

        $rodada = ($rodada_atual - $ultimas_rodadas) > 0 ? ($rodada_atual - $ultimas_rodadas) : 1;

        $conquista_casa = COLLECT(DB::SELECT('
            SELECT 
                clube_casa_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            SELECT 
                                IFNULL(AVG(pontuacao), 0)
                            FROM parciais
                            WHERE clube_id = clube_casa_id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_id
                        )
                        ELSE IFNULL(AVG(pontuacao), 0)
                    END
                ) pontos                
            FROM partidas
            INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id )
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_casa_id
            ORDER BY clube_casa_id
        '))->keyBy('id');

        $cedidas_casa = COLLECT(DB::SELECT('
            SELECT 
                clube_casa_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            SELECT 
                                AVG(pontuacao) 
                            FROM (

                                SELECT 
                                    pontuacao
                                FROM partidas
                                INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_visitante_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '                                    

                                UNION ALL

                                SELECT 
                                    pontuacao
                                FROM partidas
                                INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_casa_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '

                            ) A
                        ) 
                        ELSE IFNULL(AVG(pontuacao), 0)
                    END
                ) pontos
            FROM partidas
            INNER JOIN clubes ON clube_casa_id = clubes.id
            INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id ) 
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_casa_id
            ORDER BY clube_casa_id
        '))->keyBy('id');

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        DB::statement('CREATE TEMPORARY TABLE partidas_temporary  
            ( 
                SELECT
                    p1.rodada,
                    p1.clube_visitante_id
                FROM partidas p1
                INNER JOIN ( 
                SELECT 
                    clube_visitante_id,
                    GROUP_CONCAT(DISTINCT rodada ORDER BY rodada DESC) rodadas
                FROM partidas
                WHERE rodada < ' . $rodada_atual . '
                GROUP BY clube_visitante_id
                ) p2 ON p2.clube_visitante_id = p1.clube_visitante_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                WHERE rodada < ' . $rodada_atual . '
                ORDER BY 
                    p1.clube_visitante_id
            );
        ', [$ultimas_rodadas]);

        $conquista_fora = COLLECT(DB::SELECT('
            SELECT 
                clube_visitante_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            SELECT 
                                IFNULL(AVG(pontuacao), 0)
                            FROM parciais
                            WHERE clube_id = clube_visitante_id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '
                            GROUP BY clube_id
                        )
                        ELSE IFNULL(AVG(pontuacao), 0)
                    END
                ) pontos  
            FROM partidas
            INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id )
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_visitante_id
            ORDER BY clube_visitante_id
        '))->keyBy('id');

        $cedidas_fora = COLLECT(DB::SELECT('
            SELECT 
                clube_visitante_id id,
                (
                    CASE 
                        WHEN ' . ($total === 'Sim' ? 'TRUE' : 'FALSE') . ' THEN 
                        (
                            SELECT 
                                AVG(pontuacao) 
                            FROM (

                                SELECT 
                                    pontuacao
                                FROM partidas
                                INNER JOIN parciais ON clube_casa_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_visitante_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '                                    

                                UNION ALL

                                SELECT 
                                    pontuacao
                                FROM partidas
                                INNER JOIN parciais ON clube_visitante_id = clube_id AND partidas.rodada = parciais.rodada
                                WHERE clube_casa_id = clubes.id AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . ' AND parciais.rodada >= ' . $rodada . '

                            ) A
                        ) 
                        ELSE IFNULL(AVG(pontuacao), 0)
                    END
                ) pontos                
            FROM partidas
            INNER JOIN clubes ON clube_visitante_id = clubes.id
            INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id ) 
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_visitante_id
            ORDER BY clube_visitante_id
        '))->keyBy('id');

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        return [
            'conquista_casa' => $conquista_casa,
            'cedidas_casa' => $cedidas_casa,
            'conquista_fora' => $conquista_fora,
            'cedidas_fora' => $cedidas_fora,
        ];
    }
}
