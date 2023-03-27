<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Posicoes;
use App\Models\Scouts;
use App\Models\Status;
use Illuminate\Http\Request;

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
        $atleta = Atletas::select('atleta_id', 'apelido', 'foto', 'variacao_num', 'preco_num', 'pontos_num', 'media_num', 'jogos_num', 'clube_id', 'posicao_id', 'status_id', 'rodada_id')
            ->selectRaw('(SELECT CONCAT(clube_casa_id, \'x\',  clube_visitante_id) FROM partidas WHERE rodada = rodada_id AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)) AS confronto')
            ->selectRaw('(SELECT DATE_FORMAT(partida_data, "%d/%m %H:%i") FROM partidas WHERE rodada = rodada_id AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)) AS partida_data')
            ->where('atleta_id', $id)
            ->first();

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
            'atleta' => $atleta,
            'clubes' => $clubes,
            'posicoes' => $posicoes,
            'status' => $status,
            'scouts' => $scouts,
        ]);
    }
}
