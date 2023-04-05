<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Game;
use App\Models\Partidas;
use App\Models\Scouts;
use Illuminate\Http\Request;

class ParciaisController extends Controller
{

    public function parciais_atletas(Request $request)
    {

        $rodadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];

        $game = Game::first();

        $atletas = Atletas::select(
            'atletas.foto',
            'atletas.apelido',
            'posicoes.nome as posicao',
            'parciais.clube_id',
            'parciais.valorizacao',
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
            'rodadas' => $rodadas,
            'atletas' => $atletas,
            'scouts' => $scouts
        ]);
    }

    public function parciais_rodadas(Request $request)
    {
        $rodadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];

        $game = Game::first();

        $partidas = Partidas::select('clube_casa_id', 'clube_visitante_id', 'placar_oficial_mandante', 'placar_oficial_visitante')
            ->selectRaw('DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data')
            ->get();

        $clubes = Clubes::get()->keyBy('id');

        return response()->json([
            'rodada_atual' => $game->rodada_atual,
            'partidas' => $partidas,
            'clubes' => $clubes,
            'rodadas' => $rodadas
        ]);
    }
}
