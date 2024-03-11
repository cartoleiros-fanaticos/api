<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Videos;
use Illuminate\Http\Request;
use Carbon\Carbon;


class VideosController extends Controller
{
    public function index(Request $request)
    {

        $temporada = $request->input('temporada', Carbon::now()->format('Y'));

        $game = Game::where('temporada', $temporada)
            ->first();

        if ($game) :
            
            $response = Videos::where('temporada', $temporada)
                ->orderBy('created_at', 'DESC')
                ->get();

            return response()->json($response);

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $temporada]);

        endif;
    }
}
