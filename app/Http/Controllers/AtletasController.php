<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Destaques;
use App\Models\Game;
use App\Models\Parciais;
use App\Models\Posicoes;
use App\Models\Scouts;
use App\Models\Status;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use Validator;

class AtletasController extends Controller
{
    public function index(Request $request)
    {

        $atletas = Atletas::select('atleta_id', 'apelido', 'foto', 'variacao_num', 'preco_num', 'pontos_num', 'media_num', 'jogos_num', 'clube_id', 'posicao_id', 'status_id', 'rodada_id')
            ->selectRaw('(SELECT CONCAT(clube_casa_id, \'x\',  clube_visitante_id) FROM partidas WHERE rodada = rodada_id AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)) AS confronto')
            ->where(function ($q) use ($request) {

                if ($request->clube_id)
                    $q->where('clube_id', $request->clube_id);

                if ($request->posicao_id)
                    $q->where('posicao_id', $request->posicao_id);

                if ($request->status_id)
                    $q->where('status_id', $request->status_id);
            })
            ->orderBy(($request->scout ?? 'G'), 'DESC')
            ->get();

        $clubes = Clubes::select('id', 'nome', 'abreviacao', '60x60')
            ->get()
            ->keyBy('id');

        $posicoes = Posicoes::select('id', 'nome')
            ->get()
            ->keyBy('id');

        $status = Status::select('id', 'nome')
            ->get()
            ->keyBy('id');

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->orderBy('tipo')
            ->get();

        return response()->json([
            'atletas' => $atletas,
            'clubes' => $clubes,
            'posicoes' => $posicoes,
            'status' => $status,
            'scouts' => $scouts,
        ]);
    }

    public function show(Request $request, string $id)
    {

        $atleta = DB::SELECT('
            SELECT 
                atleta_id,
                apelido,
                foto,
                variacao_num,
                preco_num,
                pontos_num,
                media_num,
                jogos_num,
                clube_id,
                posicoes.nome as posicao_nome,
                posicao_id,
                status_id,
                rodada_id,
                observacao,
                G,
                A,
                DS,
                FD,
                FF,
                FT,
                FS,
                GS,
                SG,
                DP,
                GC,
                CA,
                CV,
                FC,
                I,
                PP,
                PS,
                PC,
                DE,

                clube_casa_id,
                clube_visitante_id,
                DATE_FORMAT(partida_data, "%d/%m %H:%i") partida_data

            FROM atletas
            INNER JOIN partidas ON rodada = rodada_id AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)
            INNER JOIN posicoes ON posicoes.id = posicao_id
            WHERE atleta_id = ?
        ', [$id])[0];

        $geral = DB::select('
            SELECT 
                IFNULL(SUM(pontuacao), 0) pontuacao,
                IFNULL(AVG(pontuacao), 0) media,
                COUNT(partidas.id) jogos
            FROM parciais 
            INNER JOIN partidas ON partidas.rodada = parciais.rodada AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)
            WHERE atleta_id = ?
        ', [$id])[0];

        $casa = DB::select('
            SELECT 
                IFNULL(SUM(pontuacao), 0) pontuacao,
                IFNULL(AVG(pontuacao), 0) media,
                COUNT(partidas.id) jogos
            FROM parciais
            INNER JOIN partidas ON partidas.rodada = parciais.rodada AND clube_casa_id = clube_id
            WHERE atleta_id = ?
        ', [$id])[0];

        $fora = DB::select('
            SELECT 
                IFNULL(SUM(pontuacao), 0) pontuacao,
                IFNULL(AVG(pontuacao), 0) media,
                COUNT(partidas.id) jogos
            FROM parciais
            INNER JOIN partidas ON partidas.rodada = parciais.rodada AND clube_visitante_id = clube_id
            WHERE atleta_id = ?
        ', [$id])[0];

        $atleta->pontuacao = [
            'geral' => $geral->pontuacao,
            'casa' => $casa->pontuacao,
            'fora' => $fora->pontuacao,
        ];

        $atleta->media = [
            'geral' => $geral->media,
            'casa' => $casa->media,
            'fora' => $fora->media,
        ];

        $atleta->jogos = [
            'geral' => $geral->jogos,
            'casa' => $casa->jogos,
            'fora' => $fora->jogos,
        ];

        $clubes = COLLECT(DB::SELECT('
            SELECT 
                id,
                nome,
                abreviacao,
                60x60 as escudo
            FROM clubes
            WHERE id IN (?, ?)
        ', [$atleta->clube_casa_id, $atleta->clube_visitante_id]))
            ->keyBy('id');

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->orderBy('tipo')
            ->get();

        $games = Game::where('temporada', Carbon::now()->format('Y'))
            ->first();

        $rodadas = COLLECT([]);

        // $games->game_over = 1;
        // $atleta->rodada_id = 38;

        $a = 1;
        $qtde_rodada = 7;
        $rodada = $games->game_over ? $atleta->rodada_id : ($atleta->rodada_id - 1);

        while ($a <= 38) :
            $rodadas->push($a . 'º rodada');
            $a++;
        endwhile;

        if ($rodada <= $qtde_rodada) $rodadas->splice($qtde_rodada);
        else $rodadas = $rodadas->splice($rodada - $qtde_rodada, $qtde_rodada);

        $parciais = COLLECT(
            DB::SELECT('
                SELECT 
                    partidas.rodada,
                    ROUND(IFNULL(pontuacao, 0), 2) as pontuacao,
                    ROUND(IFNULL(variacao_num, 0), 2) as variacao_num
                FROM partidas
                LEFT JOIN parciais ON partidas.rodada = parciais.rodada AND atleta_id = ?
                GROUP BY partidas.rodada, pontuacao, variacao_num
                LIMIT ?
                OFFSET ?
            ', [$id, $qtde_rodada, $rodada])
        );

        return response()->json([
            'atleta' => $atleta,
            'clubes' => $clubes,
            'scouts' => $scouts,
            'grafico' => [
                'rodadas' => $rodadas->all(),
                'pontuacao' => $rodada ? $parciais->pluck('pontuacao') : [],
                'variacao_num' => $rodada ? $parciais->pluck('variacao_num') : [],
            ]
        ]);
    }

    public function compare(Request $request)
    {

        $regras = [
            'atleta_a' => 'required',
            'atleta_b' => 'required'
        ];

        $mensagens = [
            'atleta_a.required' => 'O campo atleta_a é obrigatório.',
            'atleta_b.required' => 'O campo atleta_b é obrigatório.'
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        function atletas($id)
        {

            $response = DB::SELECT(
                '
                SELECT	                
                    foto,
                    atleta_id,
                    apelido,
                    clubes.nome,
                    clubes.60x60 as escudo,
                    pontos_num,
                    media_num,
                    jogos_num,
                    pontuacao_min,	
                
                    G,
                    A,
                    DS,
                    (FF + FT + FD + G) as finalizacao,
                    I,
                    (CA + CV) as cartoes,
                    DE,
                    FS,
                    FC,
                    
                    ROUND(IFNULL(G / jogos_num, 0), 2) as media_gols,
                    ROUND(IFNULL(A / jogos_num, 0), 2) as media_assistencia,
                    ROUND(IFNULL(DS / jogos_num, 0), 2) as media_roubos,
                    ROUND(IFNULL((FF + FT + FD + G) / jogos_num, 0), 2) as media_finalizacao,
                    ROUND(IFNULL(I / jogos_num, 0), 2) as media_impedimento,
                    ROUND(IFNULL((CA + CV) / jogos_num, 0), 2) as media_cartoes,
                    ROUND(IFNULL(DE / jogos_num, 0), 2) as media_defesa,
                    ROUND(IFNULL(FS / jogos_num, 0), 2) as media_falta_sofrida,
                    ROUND(IFNULL(FC / jogos_num, 0), 2) as media_falta_cometida,

                    (
                        SELECT 
                            IFNULL(AVG(pontuacao), 0)
                        FROM partidas 
                        JOIN parciais ON partidas.rodada = partidas.rodada 
                        WHERE clube_casa_id = clube_id AND atleta_id = ?
                    ) as media_pontos_casa,

                    (
                        SELECT 
                            IFNULL(AVG(pontuacao), 0)
                        FROM partidas 
                        JOIN parciais ON partidas.rodada = partidas.rodada 
                        WHERE clube_visitante_id = clube_id AND atleta_id = ?
                    ) as media_pontos_fora  
                        
                FROM 
                    atletas
                JOIN 
                    clubes ON clube_id = clubes.id
                WHERE
                    atleta_id = ?
            ',
                [$id, $id, $id]
            )[0];

            $pontos = Parciais::selectRaw('IFNULL(MIN(pontuacao), 0) as pontuacao_minima')
                ->selectRaw('IFNULL(MAX(pontuacao), 0) as pontuacao_maxima')
                ->where('atleta_id', $id)
                ->first();

            $response->pontuacao_minima = $pontos->pontuacao_minima;
            $response->pontuacao_maxima = $pontos->pontuacao_maxima;

            return $response;
        }

        return response()->json([
            'atleta_a' => atletas($request->atleta_a),
            'atleta_b' => atletas($request->atleta_b),
        ]);
    }

    public function pontos_cedidos(Request $request)
    {

        $regras = [
            'time_id' => 'required',
            'posicao_id' => 'required'
        ];

        $mensagens = [
            'time_id.required' => 'O campo time_id é obrigatório.',
            'posicao_id.required' => 'O campo posicao_id é obrigatório.'
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $time_id = $request->time_id;
        $posicao_id = $request->posicao_id;

        $game = Game::first();

        $posicao = Posicoes::where('id', $posicao_id)
            ->first();

        $time = DB::SELECT('
            SELECT 
                nome,
                30x30 as escudo,
                IF(clubes.id = clube_visitante_id, \'mandante\', \'visitante\') as mando
            FROM clubes 
            INNER JOIN partidas ON clube_casa_id = clubes.id OR clube_visitante_id = clubes.id  
            WHERE clubes.id = ?	AND rodada = ?
        ', [$time_id, $game->rodada_atual])[0];

        if ($time->mando === 'visitante') :

            $confrontos = DB::SELECT('
                SELECT 
                    clubes.id,
                    CONCAT(nome, \' x \', ?) as confronto,
                    30x30 as escudo_casa,
                    ? as escudo_fora,
                    rodada,
                    DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data
                FROM partidas
                INNER JOIN clubes ON clube_casa_id = clubes.id 
                WHERE clube_visitante_id = ? AND valida = 1 AND rodada != ?
            ', [$time->nome, $time->escudo, $time_id, $game->rodada_atual]);

        else :

            $confrontos = DB::SELECT('
                SELECT 
                    clubes.id,
                    CONCAT(?, \' x \', nome) as confronto,
                    ? as escudo_casa,
                    30x30 as escudo_fora,
                    rodada,
                    DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data
                FROM partidas
                INNER JOIN clubes ON clube_visitante_id = clubes.id 
                WHERE clube_casa_id = ? AND valida = 1 AND rodada != ?
            ', [$time->nome, $time->escudo, $time_id, $game->rodada_atual]);

        endif;

        foreach ($confrontos as $confronto) :

            $confronto->atletas = DB::SELECT('
                SELECT
                    foto,
                    apelido,
                    pontuacao,
                    parciais.A,
                    parciais.G,
                    parciais.CA,
                    parciais.CV,
                    parciais.DP,
                    parciais.FC,
                    parciais.FD,
                    parciais.FF,
                    parciais.FS,
                    parciais.FT,
                    parciais.GC,
                    parciais.GS,
                    parciais.I,
                    parciais.PP,
                    parciais.DS,
                    parciais.SG,
                    parciais.PS,
                    parciais.PC,
                    parciais.DE
                FROM parciais 
                INNER JOIN atletas ON parciais.atleta_id = atletas.atleta_id
                WHERE atletas.clube_id = ? AND rodada = ? AND posicao_id = ?
            ', [$confronto->id, $confronto->rodada, $posicao_id]);

            $confronto->pontuacao_total = COLLECT($confronto->atletas)->sum('pontuacao');

        endforeach;

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->orderBy('tipo')
            ->get();

        return response()->json([
            'time' => $time,
            'posicao' => $posicao,
            'confrontos' => $confrontos,
            'scouts' => $scouts
        ]);
    }

    public function destaques(Request $request)
    {

        $game = Game::first();

        $response = Destaques::where('rodada', $game->rodada_atual)
            ->orderBy('tipo')
            ->orderBy('escalacoes', 'DESC')
            ->get()
            ->groupBy('tipo');

        return response()->json($response);
    }
}
