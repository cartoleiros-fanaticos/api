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

        $rodada_atual = $game->rodada_atual;

        $partidas = Partidas::select('clube_casa_id', 'clube_visitante_id')
            ->where('rodada', $rodada_atual)
            ->get();

        $clubes = Clubes::select('id', 'escudo')
            ->get()
            ->keyBy('id');

        $scouts = $this->scouts('G', null);

        return response()->json([
            'scouts' => $scouts,
            'partidas' => $partidas,
            'clubes' => $clubes,
        ]);
    }

    public function scouts($scout, $posicao_id, $ultimas_rodadas = 38)
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
                    GROUP BY clube_casa_id
                ) p2 ON p2.clube_casa_id = p1.clube_casa_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                ORDER BY 
	                p1.clube_casa_id
            );
        ', [$ultimas_rodadas]);

        $conquista_casa = COLLECT(DB::SELECT('
            SELECT 
                clube_casa_id id,
                IFNULL(SUM(?), 0) pontos
            FROM partidas
            INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id )
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_casa_id
            ORDER BY clube_casa_id
        ', [$scout]))->keyBy('id');

        $cedidas_casa = COLLECT(DB::SELECT('
            SELECT 
                clube_casa_id id,
                IFNULL(SUM(?), 0) pontos
            FROM partidas
            INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_casa_id = partidas.clube_casa_id ) 
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_casa_id
            ORDER BY clube_casa_id
        ', [$scout]))->keyBy('id');

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
                GROUP BY clube_visitante_id
                ) p2 ON p2.clube_visitante_id = p1.clube_visitante_id AND FIND_IN_SET(p1.rodada, p2.rodadas) <= ?
                ORDER BY 
                    p1.clube_visitante_id
            );
        ', [$ultimas_rodadas]);

        $conquista_fora = COLLECT(DB::SELECT('
            SELECT 
                clube_visitante_id id,
                IFNULL(SUM(?), 0) pontos
            FROM partidas
            INNER JOIN parciais ON partidas.clube_visitante_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id )
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_visitante_id
            ORDER BY clube_visitante_id
        ', [$scout]))->keyBy('id');

        $cedidas_fora = COLLECT(DB::SELECT('
            SELECT 
                clube_visitante_id id,
                IFNULL(SUM(?), 0) pontos
            FROM partidas
            INNER JOIN parciais ON partidas.clube_casa_id = parciais.clube_id AND parciais.rodada = partidas.rodada AND partidas.rodada IN ( SELECT rodada FROM partidas_temporary pt WHERE clube_visitante_id = partidas.clube_visitante_id ) 
            WHERE valida = 1 AND posicao_id = ' . ($posicao_id ?? 'posicao_id') . '             
            GROUP BY clube_visitante_id
            ORDER BY clube_visitante_id
        ', [$scout]))->keyBy('id');

        DB::statement('DROP TEMPORARY TABLE partidas_temporary;');

        return [ 
            'conquista_casa' => $conquista_casa,
            'cedidas_casa' => $cedidas_casa,
            'conquista_fora' => $conquista_fora,
            'cedidas_fora' => $cedidas_fora,
        ];
    }
}
