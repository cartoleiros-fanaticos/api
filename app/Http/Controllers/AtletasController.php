<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Posicoes;
use App\Models\Scouts;
use App\Models\Status;
use Illuminate\Http\Request;
use DB;

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

        $scouts = Scouts::select('sigla', 'nome')
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
        ')[0];

        $geral = DB::select('
            SELECT 
                IFNULL(SUM(pontuacao), 0) pontuacao,
                IFNULL(AVG(pontuacao), 0) media,
                COUNT(partidas.id) jogos
            FROM parciais 
            INNER JOIN partidas ON partidas.rodada = parciais.rodada AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)
            WHERE atleta_id = ?
        ', [$atleta->atleta_id])[0];

        $casa = DB::select('
            SELECT 
                IFNULL(SUM(pontuacao), 0) pontuacao,
                IFNULL(AVG(pontuacao), 0) media,
                COUNT(partidas.id) jogos
            FROM parciais
            INNER JOIN partidas ON partidas.rodada = parciais.rodada AND clube_casa_id = clube_id
            WHERE atleta_id = ?
        ', [$atleta->atleta_id])[0];

        $fora = DB::select('
            SELECT 
                IFNULL(SUM(pontuacao), 0) pontuacao,
                IFNULL(AVG(pontuacao), 0) media,
                COUNT(partidas.id) jogos
            FROM parciais
            INNER JOIN partidas ON partidas.rodada = parciais.rodada AND clube_visitante_id = clube_id
            WHERE atleta_id = ?
        ', [$atleta->atleta_id])[0];

        $atleta->pontuacao = [
            'pontuacao_geral' => $geral->pontuacao,
            'pontos_casa' => $casa->pontuacao,
            'pontos_fora' => $fora->pontuacao,
        ];

        $atleta->media = [
            'media_geral' => $geral->media,
            'media_casa' => $casa->media,
            'media_fora' => $fora->media,
        ];

        $atleta->jogos = [
            'jogos_geral' => $geral->jogos,
            'jogos_casa' => $casa->jogos,
            'jogos_fora' => $fora->jogos,
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

        $scouts = Scouts::select('sigla', 'nome')
            ->get();

        return response()->json([
            'atleta' => $atleta,
            'clubes' => $clubes,
            'scouts' => $scouts,
        ]);
    }
}
