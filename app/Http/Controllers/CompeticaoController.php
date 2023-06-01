<?php

namespace App\Http\Controllers;

use App\Models\Competicoes;
use App\Models\CompeticoesPosicoes;
use App\Models\CompeticoesRodadas;
use App\Models\CompeticoesTimes;
use App\Models\CompeticoesTransacoes;
use App\Models\Game;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Validator;
use DB;

class CompeticaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $game = Game::first();

        $usuarios = Usuarios::with(['competicoes'])
            ->where('funcao', 'Dono de Liga')
            ->paginate(50);

        // $usuarios = Competicoes::with('usuario')->get();

        return $usuarios;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $regras = [
            'nome' => 'required',
            'descricao' => 'required',
            'tipo' => 'required',
            'comissao' => 'required',
            'valor' => 'required',
            'num_posicoes' => 'required',
            'de' => 'required',
            'ate' => 'required',
            'capitao' => 'required',
            'provedor' => 'required',
            'posicoes' => 'required',
        ];

        $mensagens = [
            'nome.required' => 'O campo nome é obrigatório.',
            'descricao
            .required' => 'O campo descricao
             é obrigatório.',
            'tipo.required' => 'O campo tipo é obrigatório.',
            'comissao.required' => 'O campo comissao é obrigatório.',
            'valor.required' => 'O campo valor é obrigatório.',
            'num_posicoes.required' => 'O campo num_posicoes é obrigatório.',
            'de.required' => 'O campo rodada de início é obrigatório.',
            'ate.required' => 'O campo rodada final é obrigatório.',
            'capitao.required' => 'O campo capitão é obrigatório.',
            'provedor' => 'O campo provedor é obrigatório.',
            'posicoes' => 'O campo posicoes é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $de = $request->de;
        $ate = $request->ate;
        $posicoes = COLLECT($request->posicoes);

        $user = auth('api')->user();

        if ($request->tipo === 'rodada' && $de != $ate)
            return response()->json(['message' => 'Para liga do tipo rodada, os campos RODADA INÍCIO e FIM precisão ser iguais '], 400);

        if ($posicoes->count() === 0)
            return response()->json(['message' => 'É precisa adicionar as premiações'], 400);

        if ($posicoes->sum('percentual') != 100)
            return response()->json(['message' => 'A soma dos campos posições precisa ser igual a 100 por cento'], 400);

        if ($de > $ate)
            return response()->json(['message' => 'O campo RODADA INÍCIO precisa ser menor ou igual a RODADA FIM'], 400);

        $game = Game::first();

        if ($game->rodada_atual > $de)
            return response()->json(['message' => 'O campo RODADA INÍCIO tem que ser maior ou igual a rodada atual do campeonato brasileiro'], 400);

        if ($game->rodada_atual > $ate)
            return response()->json(['message' => 'O campo RODADA FIM tem que ser maior ou igual a rodada atual do campeonato brasileiro'], 400);

        $response = DB::transaction(function () use ($request, $de, $ate, $user, $posicoes) {

            $competicao = new Competicoes;

            $competicao->nome = $request->nome;
            $competicao->descricao = $request->descricao;
            $competicao->tipo = $request->tipo;
            $competicao->comissao = $request->comissao;
            $competicao->valor = $request->valor;
            $competicao->num_posicoes = $request->num_posicoes;
            $competicao->de = $de;
            $competicao->ate = $ate;
            $competicao->ativo = $request->ativo;
            $competicao->capitao = $request->capitao;
            $competicao->provedor = $request->provedor;
            $competicao->usuarios_id = $user->id;

            $competicao->save();

            foreach ($posicoes as $val) :

                $posicao = new CompeticoesPosicoes;

                $posicao->posicao = $val['posicao'];
                $posicao->percentual = $val['percentual'];
                $posicao->competicoes_id = $competicao->id;

                $posicao->save();

            endforeach;

            return $competicao;
        }, 3);

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $competicao = Competicoes::find($id);

        $times = CompeticoesTransacoes::join('competicoes_times', 'competicoes_times.id', 'competicoes_transacoes.competicoes_times_id')
            ->join('competicoes_rodadas', 'competicoes_rodadas.competicoes_times_id', 'competicoes_times.id')
            ->where('competicoes_transacoes.competicoes_id', $competicao->id)
            ->where('situacao', 'Aceita')
            ->paginate(100);

        $posicoes = CompeticoesPosicoes::where('competicoes_id', $competicao->id)
            ->get();

        $response =  [
            'competicao' => $competicao,
            'times' => $times,
            'posicoes' => $posicoes
        ];

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $regras = [
            'nome' => 'required',
            'descricao' => 'required',
            'tipo' => 'required',
            'comissao' => 'required',
            'valor' => 'required',
            'num_posicoes' => 'required',
            'de' => 'required',
            'ate' => 'required',
            'capitao' => 'required',
            'provedor' => 'required',
            'posicoes' => 'required',
        ];

        $mensagens = [
            'nome.required' => 'O campo nome é obrigatório.',
            'descricao.required' => 'O campo descricao
             é obrigatório.',
            'tipo.required' => 'O campo tipo é obrigatório.',
            'comissao.required' => 'O campo comissao é obrigatório.',
            'valor.required' => 'O campo valor é obrigatório.',
            'num_posicoes.required' => 'O campo num_posicoes é obrigatório.',
            'de.required' => 'O campo rodada de início é obrigatório.',
            'ate.required' => 'O campo rodada final é obrigatório.',
            'capitao.required' => 'O campo capitão é obrigatório.',
            'provedor' => 'O campo provedor é obrigatório.',
            'posicoes' => 'O campo posicoes é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $de = $request->de;
        $ate = $request->ate;
        $posicoes = COLLECT($request->posicoes);

        $user = auth('api')->user();

        if ($request->tipo === 'rodada' && $de != $ate)
            return response()->json(['message' => 'Para liga do tipo rodada, os campos RODADA INÍCIO e FIM precisão ser iguais '], 400);

        if ($posicoes->count() === 0)
            return response()->json(['message' => 'É precisa adicionar as premiações'], 400);

        if ($posicoes->sum('percentual') != 100)
            return response()->json(['message' => 'A soma dos campos posições precisa ser igual a 100 por cento'], 400);

        if ($de > $ate)
            return response()->json(['message' => 'O campo RODADA INÍCIO precisa ser menor ou igual a RODADA FIM'], 400);

        $game = Game::first();

        if ($game->rodada_atual > $de)
            return response()->json(['message' => 'O campo RODADA INÍCIO tem que ser maior ou igual a rodada atual do campeonato brasileiro'], 400);

        if ($game->rodada_atual > $ate)
            return response()->json(['message' => 'O campo RODADA FIM tem que ser maior ou igual a rodada atual do campeonato brasileiro'], 400);

        $response = DB::transaction(function () use ($request, $de, $ate, $user, $posicoes, $id) {

            $competicao = Competicoes::find($id);

            $competicao->nome = $request->nome;
            $competicao->descricao = $request->descricao;
            $competicao->tipo = $request->tipo;
            $competicao->comissao = $request->comissao;
            $competicao->valor = $request->valor;
            $competicao->num_posicoes = $request->num_posicoes;
            $competicao->de = $de;
            $competicao->ate = $ate;
            $competicao->ativo = $request->ativo;
            $competicao->capitao = $request->capitao;
            $competicao->provedor = $request->provedor;
            $competicao->usuarios_id = $user->id;

            $competicao->save();

            CompeticoesPosicoes::where('competicoes_id', $competicao->id)
                ->forceDelete();

            foreach ($posicoes as $val) :

                $posicao = new CompeticoesPosicoes;

                $posicao->posicao = $val['posicao'];
                $posicao->percentual = $val['percentual'];
                $posicao->competicoes_id = $competicao->id;

                $posicao->save();

            endforeach;

            return $competicao;
        }, 3);

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function solicitacao(Request $request)
    {

        $regras = [
            'competicoes_id' => 'required',
            'times_id' => 'required',
        ];

        $mensagens = [
            'competicoes_id.required' => 'O campo competicoes_id é obrigatório.',
            'times_id.required' => 'O campo times_id é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $acao = $request->input('acao', 'cadastrar');
        $competicoes_id = $request->competicoes_id;
        $times_id = $request->times_id;

        if ($acao === 'cadastrar') :

            $parciais = new ParciaisController;
            $response = $parciais->parciais_time($times_id);

            if (isset($response->original['time'])) :

                $response = DB::transaction(function () use ($response, $competicoes_id) {

                    $user = auth('api')->user();
                    $time_cartola = $response->original['time'];

                    $times = new CompeticoesTimes;
                    $times->times_cartolas_id =  $time_cartola['id'];
                    $times->usuarios_id =  $user->id;
                    $times->save();

                    $transacao = new CompeticoesTransacoes;
                    $transacao->competicoes_id =  $competicoes_id;
                    $transacao->competicoes_times_id =  $times->id;
                    $response = $transacao->save();

                    return $time_cartola;
                }, 3);

            endif;

        endif;


        return response()->json($response);
    }
}
