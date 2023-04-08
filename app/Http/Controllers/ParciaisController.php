<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Game;
use App\Models\Parciais;
use App\Models\Partidas;
use App\Models\Scouts;
use Illuminate\Http\Request;
use Validator;

class ParciaisController extends Controller
{

    public function parciais_atletas(Request $request)
    {
        $game = Game::first();

        $atletas = Atletas::select(
            'atletas.foto',
            'atletas.apelido',
            'posicoes.nome as posicao',
            'parciais.clube_id',
            'parciais.variacao_num',
            'parciais.pontuacao',
            'parciais.A',
            'parciais.G',
            'parciais.CA',
            'parciais.CV',
            'parciais.DP',
            'parciais.FC',
            'parciais.FD',
            'parciais.FF',
            'parciais.FS',
            'parciais.FT',
            'parciais.GC',
            'parciais.GS',
            'parciais.I',
            'parciais.PP',
            'parciais.DS',
            'parciais.GS',
            'parciais.PS',
            'parciais.PC',
            'parciais.DE'
        )
            ->join('parciais', 'parciais.atleta_id', 'atletas.atleta_id')
            ->join('posicoes', 'posicoes.id', 'atletas.posicao_id')
            ->where('rodada', $game->rodada_atual)
            ->get();

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->orderBy('tipo')
            ->get();

        return response()->json([
            'game' => $game,
            'atletas' => $atletas,
            'scouts' => $scouts
        ]);
    }

    public function parciais_rodadas(Request $request)
    {
        $game = Game::first();

        $partidas = Partidas::select('id', 'clube_casa_id', 'clube_visitante_id', 'placar_oficial_mandante', 'placar_oficial_visitante')
            ->selectRaw('DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data')
            ->get();

        $clubes = Clubes::get()->keyBy('id');

        return response()->json([
            'rodada_atual' => $game->rodada_atual,
            'partidas' => $partidas,
            'clubes' => $clubes,
        ]);
    }

    public function parciais_partida(Request $request)
    {

        $regras = [
            'clube_casa_id' => 'required',
            'clube_visitante_id' => 'required',
        ];

        $mensagens = [
            'clube_casa_id.required' => 'O campo clube_casa_id é obrigatório.',
            'clube_visitante_id.required' => 'O campo clube_visitante_id é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $clube_casa = Parciais::with(['clubes', 'posicoes'])
            ->where('clube_id', $request->clube_casa_id)
            ->get();

        $clube_visitante = Parciais::with(['clubes', 'posicoes'])
            ->where('clube_id', $request->clube_visitante_id)
            ->get();

        $clubes = Clubes::get()->keyBy('id');

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->orderBy('tipo')
            ->get();

        return response()->json([
            'partida' => [
                'clube_casa' => $clube_casa,
                'clube_visitante' => $clube_visitante,
            ],
            'clubes' => $clubes,
            'scouts' => $scouts,
        ]);
    }
}
