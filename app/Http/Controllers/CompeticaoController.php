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
use GuzzleHttp\Client;

use Exception;
use Log;
use DB;

class CompeticaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth('api')->user();

        $usuarios = Usuarios::where('funcao', 'Dono de Liga')
            ->paginate(50);

        $times = CompeticoesTimes::where('usuarios_id', $user->id)
            ->get();

        $solicitacoes = CompeticoesTransacoes::with(['competicao', 'time.time_cartola'])
            ->whereIn('competicoes_times_id', COLLECT($times)->pluck('id'))
            ->get();

        return response()->json([
            'usuarios' => $usuarios,
            'times' => $times,
            'solicitacoes' => $solicitacoes,
        ]);
    }

    public function ligas(Request $request, $id)
    {
        $game = Game::first();

        $response = Competicoes::select('competicoes.id', 'competicoes.nome', 'valor', 'tipo', 'usuarios.comissao')
            ->join('usuarios', 'usuarios.id', 'competicoes.usuarios_id')
            ->selectRaw('
                (
                    SELECT 
                        COUNT(id)
                    FROM competicoes_transacoes 
                    WHERE competicoes_id = competicoes.id AND situacao = \'Aceita\'
                ) as qtde_times
            ')
            ->where('competicoes.usuarios_id', $id)
            ->where(function ($q) use ($request) {

                if ($request->type)
                    $q->where('tipo', $request->type);
            })
            ->paginate(50);

        return response()->json($response);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $regras = [
            'nome' => 'required',
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

        $game = Game::first();

        $rodada_atual = $game->status_mercado != 1 ? $game->rodada_atual : ($game->rodada_atual - 1);

        if ($rodada_atual >= $de)
            return response()->json(['message' => 'Não é possível cadastrar uma liga com rodada em andamento ou que já encerraram.'], 400);

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
        $competicao = Competicoes::select('competicoes.id', 'capitao', 'de', 'ate', 'competicoes.nome', 'valor', 'tipo', 'usuarios.comissao')
            ->join('usuarios', 'usuarios.id', 'competicoes.usuarios_id')
            ->selectRaw('
                (
                    SELECT 
                        COUNT(id)
                    FROM competicoes_transacoes 
                    WHERE competicoes_id = competicoes.id AND situacao = \'Aceita\'
                ) as qtde_times
            ')
            ->find($id);

        $pontos = $competicao->capitao === 'Sim' ? 'pontos' : 'pontos_sem_capitao as pontos';

        $times = CompeticoesTransacoes::select('times_cartolas.time_id', 'url_escudo_png', 'times_cartolas.nome', 'nome_cartola')
            ->selectRaw('SUM(' . $pontos . ') pontos')
            ->join('competicoes', 'competicoes.id', 'competicoes_transacoes.competicoes_id')
            ->join('competicoes_times', 'competicoes_times.id', 'competicoes_transacoes.competicoes_times_id')
            ->join('competicoes_rodadas', 'competicoes_rodadas.competicoes_times_id', 'competicoes_times.id')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->join('times_cartola_rodadas', function ($join) {
                $join->on('times_cartola_rodadas.times_cartolas_id', 'times_cartolas.id')
                    ->whereColumn('times_cartola_rodadas.rodada_time_id', '>=', 'de')
                    ->whereColumn('times_cartola_rodadas.rodada_time_id', '<=', 'ate');
            })
            ->where('competicoes_transacoes.competicoes_id', $competicao->id)
            ->where('competicoes_transacoes.situacao', 'Aceita')
            ->groupBy('times_cartolas.time_id')
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

        $game = Game::first();

        $rodada_atual = $game->status_mercado != 1 ? $game->rodada_atual : ($game->rodada_atual - 1);

        if ($rodada_atual >= $de)
            return response()->json(['message' => 'Não é possível cadastrar uma liga com rodada em andamento ou que já encerraram.'], 400);

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
        $response = Competicoes::destroy($id);
        return response()->json($response);
    }

    public function deletar_times($id)
    {
        $response = CompeticoesTimes::destroy($id);
        return response()->json($response);
    }

    public function solicitacao(Request $request)
    {

        $regras = [
            'competicoes_id' => 'required',
            'time_id' => 'required',
        ];

        $mensagens = [
            'competicoes_id.required' => 'O campo competicoes_id é obrigatório.',
            'time_id.required' => 'O campo time_id é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $acao = $request->input('acao', 'cadastrar');
        $competicoes_id = $request->competicoes_id;
        $time_id = $request->time_id;

        if ($acao === 'cadastrar') :

            $contains = CompeticoesTransacoes::join('competicoes_times', 'competicoes_times.id', 'competicoes_times_id')
                ->where('competicoes_id', $competicoes_id)
                ->where('time_id', $time_id)
                ->count();

            if ($contains)
                return response()->json(['message' => 'Já existe uma solicitação de entrada nessa liga.'], 400);

            $parciais = new ParciaisController;
            $response = $parciais->parciais_time($time_id);

            if (isset($response->original['time'])) :

                $response = DB::transaction(function () use ($response, $time_id, $competicoes_id) {

                    $user = auth('api')->user();
                    $time_cartola = $response->original['time'];

                    $times = CompeticoesTimes::updateOrCreate(
                        [
                            'times_cartolas_id' => $time_cartola['id'],
                            'usuarios_id' => $user->id
                        ],
                        [
                            'time_id' => $time_id
                        ]
                    );

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

    public function aceitar_solicitacao(Request $request)
    {

        if (isset($request->topic)) :

            $id = $request->id;
            $topic = $request->topic;

            try {

                if ($topic === 'payment') :

                    $token = "";

                    $headers = [
                        'Content-Type' => 'application/json',
                        'Authorization' => "Bearer $token"
                    ];

                    $client = new Client();
                    $payment = $client->get("https://api.mercadopago.com/v1/payments/$id", ['timeout' => 60, 'headers' => $headers]);
                    $payment = json_decode($payment->getBody(), true);

                    if ($payment['status'] === 'approved') :

                        DB::transaction(function () use ($payment) {

                            $transacao = CompeticoesTransacoes::find($payment['external_reference']);
                            $transacao->situacao =  'Aceita';
                            $response = $transacao->save();

                            if ($response && $transacao->situacao === 'Aceita') :

                                $competicao = Competicoes::find($transacao->competicoes_id);

                                $rodadas = new CompeticoesRodadas;
                                $rodadas->competicoes_id = $competicao->nome;
                                $rodadas->rodada = $competicao->de;
                                $rodadas->competicoes_times_id = $transacao->competicoes_times_id;
                                $rodadas->save();

                            endif;
                        }, 3);

                    endif;

                endif;

                return 'ok';
            } catch (Exception $e) {
                Log::error('PIX: ' . $e->getMessage());
                return response()->json(['message' => $e->getMessage()], 400);
            }

        else :

            $regras = [
                'id' => 'required',
                'situacao' => 'required',
            ];

            $mensagens = [
                'id.required' => 'O campo id é obrigatório.',
                'situacao.required' => 'O campo situacao é obrigatório.',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails())
                return response()->json(['message' => $validator->errors()->first()], 400);

            $response = DB::transaction(function () use ($request) {

                $transacao = CompeticoesTransacoes::find($request->id);
                $transacao->situacao = $request->situacao;
                $response = $transacao->save();

                if ($response && $transacao->situacao === 'Aceita') :

                    $competicao = Competicoes::find($transacao->competicoes_id);

                    $rodadas = new CompeticoesRodadas;
                    $rodadas->competicoes_id = $transacao->competicoes_id;
                    $rodadas->rodada = $competicao->de;
                    $rodadas->competicoes_times_id = $transacao->competicoes_times_id;
                    $rodadas->save();

                endif;

                return true;
            }, 3);

        endif;

        return response()->json($response);
    }

    public function solicitacoes(Request $request)
    {

        $user = auth('api')->user();

        $response = CompeticoesTransacoes::select('competicoes_transacoes.id', 'competicoes_transacoes.situacao', 'competicoes.nome as competicao', 'times_cartolas.nome', 'competicoes.valor')
            ->selectRaw('DATE_FORMAT(competicoes_transacoes.created_at, "%d/%m %H:%i") as criado_em')
            ->join('competicoes', 'competicoes_id', 'competicoes.id')
            ->join('competicoes_times', 'competicoes_times_id', 'competicoes_times.id')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->where('competicoes_times.usuarios_id', $user->id)
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json($response);
    }

    public function times(Request $request)
    {

        $user = auth('api')->user();

        $response = CompeticoesTimes::select('competicoes_times.id', 'url_escudo_png', 'nome', 'patrimonio')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->where('usuarios_id', $user->id)
            ->get();

        return response()->json($response);
    }

    public function minhasLigas(Request $request)
    {
        $user = auth('api')->user();

        $response = CompeticoesTransacoes::select('competicoes.id', 'competicoes.situacao', 'competicoes.nome as competicao', 'times_cartolas.nome', 'competicoes.valor')
            ->join('competicoes', 'competicoes_id', 'competicoes.id')
            ->join('competicoes_times', 'competicoes_times_id', 'competicoes_times.id')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->where('competicoes_times.usuarios_id', $user->id)
            ->where('competicoes_transacoes.situacao', 'Aceita')
            ->get();

        return response()->json($response);
    }
}
