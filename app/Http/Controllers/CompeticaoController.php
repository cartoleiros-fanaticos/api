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
use Carbon\Carbon;
use Validator;
use DB;

class CompeticaoController extends Controller
{

    private $temporada;

    public function __construct(Request $request)
    {
        $this->temporada = $request->input('temporada', Carbon::now()->format('Y'));
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth('api')->user();

        $usuarios = Usuarios::where('funcao', 'Dono de Liga')
            ->paginate(50);

        $times = CompeticoesTimes::where('temporada', $this->temporada)
            ->where('usuarios_id', $user->id)
            ->get();

        $solicitacoes = CompeticoesTransacoes::with(['competicao', 'time.time_cartola'])
            ->where('temporada', $this->temporada)
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
        $game = Game::where('temporada', $this->temporada)
            ->first();

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
            ->where('temporada', $this->temporada)
            ->where('competicoes.usuarios_id', $id)
            ->where(function ($q) use ($request) {

                if ($request->type)
                    $q->where('tipo', $request->type);
            })
            ->orderBy('de', 'DESC')
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
            'posicoes' => 'O campo posicoes é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $de = $request->de;
        $ate = $request->ate;
        $posicoes = COLLECT($request->posicoes);

        $user = auth('api')->user();

        $game = Game::where('temporada', $this->temporada)
            ->first();

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

        if ($game->rodada_atual > $de)
            return response()->json(['message' => 'O campo RODADA INÍCIO tem que ser maior ou igual a rodada atual do campeonato brasileiro'], 400);

        if ($game->rodada_atual > $ate)
            return response()->json(['message' => 'O campo RODADA FIM tem que ser maior ou igual a rodada atual do campeonato brasileiro'], 400);

        $response = DB::transaction(function () use ($request, $de, $ate, $user, $posicoes) {

            $competicao = new Competicoes;

            $competicao->temporada = $this->temporada;
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
            $competicao->usuarios_id = $user->id;

            $competicao->save();

            foreach ($posicoes as $val) :

                $posicao = new CompeticoesPosicoes;

                $posicao->temporada = $this->temporada;
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
        $game = Game::where('temporada', $this->temporada)
            ->first();

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
            ->where('temporada', $this->temporada)
            ->find($id);

        $pontos = $competicao->capitao === 'Sim' ? 'pontos' : 'pontos_sem_capitao';
        $rodada_atual = $game->status_mercado === 1 ? ($game->rodada_atual === 1 ? $game->rodada_atual : ($game->rodada_atual - 1)) : $game->rodada_atual;

        $times = CompeticoesTransacoes::select('times_cartolas.time_id', 'url_escudo_png', 'times_cartolas.nome', 'nome_cartola')
            ->selectRaw('SUM(' . $pontos . ') as pontos_total')
            ->selectRaw("(
                    SELECT 
                        $pontos
                    FROM times_cartola_rodadas 
                    WHERE rodada_time_id = $rodada_atual AND times_cartolas_id = times_cartolas.id
                ) as pontos")
            ->join('competicoes', 'competicoes.id', 'competicoes_transacoes.competicoes_id')
            ->join('competicoes_times', 'competicoes_times.id', 'competicoes_transacoes.competicoes_times_id')
            // ->join('competicoes_rodadas', function ($join) {
            //     $join->on('competicoes_rodadas.competicoes_times_id', 'competicoes_times.id')
            //         ->whereColumn('competicoes_rodadas.competicoes_id', 'competicoes.id');
            // })
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->join('times_cartola_rodadas', function ($join) use ($rodada_atual) {
                $join->on('times_cartola_rodadas.times_cartolas_id', 'times_cartolas.id')
                    ->whereColumn('times_cartola_rodadas.rodada_time_id', '>=', 'de')
                    //->whereColumn('times_cartola_rodadas.rodada_time_id', '<=', 'ate');
                    ->where('times_cartola_rodadas.rodada_time_id', '<=', $rodada_atual);
            })
            ->where('competicoes_transacoes.competicoes_id', $competicao->id)
            ->where('competicoes_transacoes.situacao', 'Aceita')
            ->where('competicoes_transacoes.temporada', $this->temporada)
            ->groupBy('times_cartolas.id')
            ->orderBy($game->status_mercado != 1 ? 'pontos' : 'pontos_total', 'DESC')
            ->paginate(100);

        $posicoes = CompeticoesPosicoes::where('competicoes_id', $competicao->id)
            ->where('temporada', $this->temporada)
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
            'posicoes' => 'O campo posicoes é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $de = $request->de;
        $ate = $request->ate;
        $posicoes = COLLECT($request->posicoes);

        $user = auth('api')->user();

        $game = Game::where('temporada', $this->temporada)
            ->first();

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
            $competicao->usuarios_id = $user->id;

            $competicao->save();

            CompeticoesPosicoes::where('competicoes_id', $competicao->id)
                ->forceDelete();

            foreach ($posicoes as $val) :

                $posicao = new CompeticoesPosicoes;

                $posicao->temporada = $this->temporada;
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

        $competicoes_id = $request->competicoes_id;
        $time_id = $request->time_id;

        $competicao = Competicoes::find($competicoes_id);

        if ($competicao->situacao != 'Aguardando')
            return response()->json(['message' => 'Não é possível mandar solicitação de inscrição após o inicio da liga.'], 400);

        $contains = CompeticoesTransacoes::join('competicoes_times', 'competicoes_times.id', 'competicoes_times_id')
            ->where('competicoes_transacoes.temporada', $this->temporada)
            ->where('competicoes_id', $competicoes_id)
            ->where('time_id', $time_id)
            ->count();

        if ($contains)
            return response()->json(['message' => 'Já existe uma solicitação de entrada nessa liga.'], 400);

        $parciais = new ParciaisController($request);
        $response = $parciais->parciais_time($time_id);

        if (isset($response->original['time'])) :

            $response = DB::transaction(function () use ($response, $time_id, $competicoes_id) {

                $user = auth('api')->user();
                $time_cartola = $response->original['time'];

                $times = CompeticoesTimes::updateOrCreate(
                    [
                        'temporada' => $this->temporada,
                        'times_cartolas_id' => $time_cartola['id'],
                        'usuarios_id' => $user->id
                    ],
                    [
                        'time_id' => $time_id
                    ]
                );

                $transacao = new CompeticoesTransacoes;
                $transacao->temporada =  $this->temporada;
                $transacao->competicoes_id =  $competicoes_id;
                $transacao->competicoes_times_id =  $times->id;
                $response = $transacao->save();

                return $time_cartola;
            }, 3);

        endif;

        return response()->json($response);
    }

    public function deletar_solicitacao($id)
    {
        $response = CompeticoesTransacoes::destroy($id);
        return response()->json($response);
    }

    public function aceitar_solicitacao(Request $request)
    {

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
                $rodadas->temporada = $this->temporada;
                $rodadas->competicoes_id = $transacao->competicoes_id;
                $rodadas->rodada = $competicao->de;
                $rodadas->competicoes_times_id = $transacao->competicoes_times_id;
                $rodadas->save();

            endif;

            return true;
        }, 3);

        return response()->json($response);
    }

    public function situacao_solicitacao(Request $request, $id)
    {

        $transacao = CompeticoesTransacoes::find($id);
        $transacao->situacao = $request->situacao === 'Aceita' ? 'Rejeitada' : 'Aceita';
        $response = $transacao->save();

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
            ->where('competicoes_transacoes.temporada', $this->temporada)
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json($response);
    }

    public function times(Request $request)
    {

        $user = auth('api')->user();

        $response = CompeticoesTimes::select('competicoes_times.id', 'url_escudo_png', 'nome', 'patrimonio')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->where('times_cartolas.temporada', $this->temporada)
            ->where('usuarios_id', $user->id)
            ->get();

        return response()->json($response);
    }

    public function deletar_times($id)
    {
        $response = CompeticoesTimes::destroy($id);
        return response()->json($response);
    }

    public function minhasLigas(Request $request)
    {
        $user = auth('api')->user();

        $response = CompeticoesTransacoes::select('competicoes_transacoes.id', 'competicoes.situacao', 'competicoes.nome as competicao', 'capitao', 'times_cartolas.nome', 'competicoes.valor')
            ->join('competicoes', 'competicoes_id', 'competicoes.id')
            ->join('competicoes_times', 'competicoes_times_id', 'competicoes_times.id')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')
            ->where('competicoes_times.usuarios_id', $user->id)
            ->where('competicoes_transacoes.situacao', 'Aceita')
            ->where('competicoes_transacoes.temporada', $this->temporada)
            ->get();

        return response()->json($response);
    }

    public function ligasADM(Request $request)
    {
        $user = auth('api')->user();

        $competicoes = Competicoes::with('posicoes')
            ->where(function ($q) use ($request, $user) {

                if ($user->funcao === 'Dono de Liga')
                    $q->where('usuarios_id', $user->id);

                if ($request->pesquisar) :

                    $q->where('nome', 'LIKE', '%' . $request->pesquisar . '%')
                        ->orWhere('tipo', 'LIKE', '%' . $request->pesquisar . '%');

                endif;
            })
            ->where('temporada', $this->temporada)
            ->orderBy('situacao')
            ->paginate(100);

        return response()->json([
            'auth' => $user,
            'competicoes' => $competicoes
        ]);
    }

    public function solicitacoesADM(Request $request)
    {
        $user = auth('api')->user();

        $solicitacoes = CompeticoesTransacoes::select('competicoes_transacoes.id', 'competicoes_transacoes.situacao', 'competicoes.nome as competicao', 'times_cartolas.nome', 'competicoes.valor')
            ->selectRaw('DATE_FORMAT(competicoes_transacoes.created_at, "%d/%m %H:%i") as criado_em')
            ->join('competicoes', 'competicoes_id', 'competicoes.id')
            ->join('competicoes_times', 'competicoes_times_id', 'competicoes_times.id')
            ->join('times_cartolas', 'times_cartolas_id', 'times_cartolas.id')

            ->where(function ($q) use ($request, $user) {

                if ($user->funcao === 'Dono de Liga')
                    $q->where('competicoes.usuarios_id', $user->id);

                if ($request->pesquisar) :

                    $q->where('competicoes_transacoes.id', 'LIKE', '%' . $request->pesquisar . '%')
                        ->orWhere('times_cartolas.nome', 'LIKE', '%' . $request->pesquisar . '%');

                endif;
            })
            ->where('competicoes_transacoes.temporada', $this->temporada)
            ->orderBy('competicoes_transacoes.situacao')
            ->paginate(100);

        return response()->json([
            'auth' => $user,
            'solicitacoes' => $solicitacoes
        ]);
    }
}
