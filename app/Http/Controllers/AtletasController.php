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

        $atletas = Atletas::where(function ($q) use ($request) {

            if ($request->pesquisar) :

                $q->where('nome', 'LIKE', '%' . $request->pesquisar . '%')
                    ->orWhere('apelido', 'LIKE', '%' . $request->pesquisar . '%');

            endif;
        })
            ->paginate(50);

        $clubes = Clubes::get();
        $posicoes = Posicoes::get();
        $status = Status::get();
        $scouts = Scouts::get();

        return response()->json([
            'atletas' => $atletas,
            'clubes' => $clubes,
            'posicoes' => $posicoes,
            'status' => $status,
            'scouts' => $scouts,
        ]);
    }
}
