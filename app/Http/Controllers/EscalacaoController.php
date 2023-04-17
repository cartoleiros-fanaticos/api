<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\EscalacaoAtletas;
use App\Models\EscalacaoRodadas;
use App\Models\EscalacaoTimes;
use App\Models\Game;
use App\Models\Parciais;
use App\Models\Scouts;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;
use DB;
use Validator;


class EscalacaoController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $game = Game::first();
        $times = EscalacaoTimes::orderBy('socio', 'ASC')
            ->get();

        return response()->json([
            'game' => $game,
            'times' => $times
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $regras = [
            'access_token' => 'required',
        ];

        $mensagens = [
            'access_token.required' => 'O campo access_token é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        try {

            $client = new Client();

            $headers = ['authorization' => 'Bearer ' . $request->access_token];

            $response = $client->get('https://api.cartola.globo.com/auth/time', ['headers' => $headers]);
            $response = json_decode($response->getBody(), true);

            DB::transaction(function () use ($response, $request) {

                $time = $response['time'];

                $escalacao_times = EscalacaoTimes::updateOrCreate(
                    [
                        'time_id' => $time['time_id']
                    ],
                    [
                        'nome' => $time['nome'],
                        'slug' => $time['slug'],
                        'patrimonio' => $response['patrimonio'],
                        'pontos_campeonato' => $response['pontos_campeonato'] ?? 0,
                        'url_escudo_png' => $time['url_escudo_png'],
                        'access_token' => $request->access_token,
                    ]
                );

                if (COLLECT($response['atletas'])->count()) :

                    $escalacao_rodadas = EscalacaoRodadas::updateOrCreate(
                        [
                            'escalacao_times_id' => $escalacao_times->id,
                            'rodada_time_id' => $time['rodada_time_id'],
                        ],
                        [
                            'capitao_id' => $response['capitao_id'],
                            'esquema' => '4-3-3',
                            'valor_time' => $response['valor_time'],
                        ]
                    );

                    EscalacaoAtletas::where('rodada_time_id', $time['rodada_time_id'])
                        ->where('escalacao_rodadas_id', $escalacao_rodadas->id)
                        ->delete();

                    foreach ((array) $response['atletas'] as $key => $val) :

                        EscalacaoAtletas::create([
                            'atleta_id' => $val['atleta_id'],
                            'preco_num' => $val['preco_num'],
                            'rodada_time_id' => $time['rodada_time_id'],
                            'escalacao_rodadas_id' => $escalacao_rodadas->id,
                        ]);

                    endforeach;

                    if (isset($response['reservas'])) :

                        foreach ((array) $response['reservas'] as $key => $val) :

                            EscalacaoAtletas::create([
                                'atleta_id' => $val['atleta_id'],
                                'preco_num' => $val['preco_num'],
                                'rodada_time_id' => $time['rodada_time_id'],
                                'escalacao_rodadas_id' => $escalacao_rodadas->id,
                                'titular' => 'Não',
                                'entrou_em_campo' => 'Não'
                            ]);

                        endforeach;

                    endif;

                endif;
            }, 3);

            return response()->json(['message' => 'Time cadastrado com sucesso.']);
        } catch (QueryException $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (RequestException $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {

        $regras = [
            'rodada' => 'required',
        ];

        $mensagens = [
            'rodada.required' => 'O campo rodada é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $rodada = $request->rodada;

        $time = EscalacaoTimes::with(
            [
                'rodadas' => function ($q) use ($rodada) {
                    $q->where('rodada_time_id', $rodada);
                },

                'rodadas.atletas' => function ($q) use ($rodada) {
                    $q->where('rodada_time_id', $rodada);
                },

                'rodadas.reservas' => function ($q) use ($rodada) {
                    $q->where('rodada_time_id', $rodada);
                }
            ]
        )
            ->where('time_id', $id)
            ->first();

        $user = auth('api')->user();

        if (($user->plano === 'Free Cartoleiro' or $user->plano === 'Demonstrativo') && $time->socio === 'Sim')
            return response()->json(['message' => 'Plano exclusivo para sócio cartoleiro fanático.'], 401);

        if (!$time->rodadas)
            return response()->json(['message' => "Time não foi escalado para a rodada $rodada."], 401);

        $atleta_id = $time->rodadas->atletas->pluck('atleta_id')->merge($time->rodadas->reservas->pluck('atleta_id'));

        $parciais = Parciais::select(
            'atleta_id',
            'G',
            'A',
            'DS',
            'FD',
            'FF',
            'FT',
            'FS',
            'GS',
            'SG',
            'DP',
            'GC',
            'CA',
            'CV',
            'FC',
            'I',
            'PP',
            'PS',
            'PC',
            'DE',
            'V',
        )
            ->selectRaw('IF(atleta_id = ' . $time->rodadas->capitao_id . ', pontuacao * 1.5, pontuacao) as pontuacao')
            ->whereIn('atleta_id', $atleta_id)
            ->where('rodada', $rodada)
            ->get()
            ->keyBy('atleta_id');

        $atleta_id = $time->rodadas->atletas->where('entrou_em_campo', 'Sim')->pluck('atleta_id')->merge($time->rodadas->reservas->where('entrou_em_campo', 'Sim')->pluck('atleta_id'));

        $pontos = Parciais::selectRaw('SUM(IF(atleta_id = ' . $time->rodadas->capitao_id . ', pontuacao * 1.5, pontuacao)) as total')
            ->whereIn('atleta_id', $atleta_id)
            ->where('rodada', $rodada)
            ->first();

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->orderBy('tipo')
            ->get();

        return response()->json([
            'pontuacao' => $pontos->total,
            'parciais' => $parciais,
            'time' => $time,
            'scouts' => $scouts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
