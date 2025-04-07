<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Config;
use App\Models\Game;
use App\Models\Parciais;
use App\Models\Partidas;
use App\Models\Posicoes;
use App\Models\Scouts;
use App\Models\TimesCartola;
use App\Models\TimesCartolaAtletas;
use App\Models\TimesCartolaRodadas;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Validator;
use Exception;
use DB;
use Log;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ParciaisController extends Controller
{

    private $temporada;

    public function __construct(Request $request)
    {
        $this->temporada = $request->input('temporada', Carbon::now()->format('Y'));
    }

    public function parciais_atletas(Request $request)
    {
        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $atletas = Atletas::select(
                'atletas.atleta_id',
                'atletas.foto',
                'atletas.apelido',
                'atletas.preco_num',
                'clubes.abreviacao as abreviacao_clube',
                'clubes.nome as clube',
                'posicoes.nome as posicao',
                'parciais.clube_id',
                'entrou_em_campo'
            )
                ->join('parciais', function ($q) {

                    $q->on('parciais.atleta_id', 'atletas.atleta_id')
                        ->where('parciais.temporada', $this->temporada);
                })
                ->join('posicoes', function ($q) {

                    $q->on('posicoes.posicao_id', 'atletas.posicao_id')
                        ->where('posicoes.temporada', $this->temporada);
                })
                ->join('clubes', function ($q) {

                    $q->on('clubes.clube_id', 'atletas.clube_id')
                        ->where('clubes.temporada', $this->temporada);
                })
                ->where('atletas.temporada', $this->temporada)
                ->where('rodada', $game->rodada_atual)
                ->orderBy('pontuacao', 'DESC')
                ->get();

            $parciais = Parciais::where('rodada', $game->rodada_atual)
                ->where('temporada', $this->temporada)
                ->get()
                ->keyBy('atleta_id');

            $scouts = Scouts::select('sigla', 'nome', 'tipo')
                ->where('temporada', $this->temporada)
                ->orderBy('tipo')
                ->get();

            return response()->json([
                'game' => $game,
                'atletas' => $atletas,
                'parciais' => $parciais,
                'scouts' => $scouts
            ]);

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function parciais_clubes(Request $request, $id)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $partida = Partidas::select('id', 'rodada', 'local', 'clube_casa_id', 'clube_visitante_id')
                ->where('temporada', $this->temporada)
                ->selectRaw('DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data')
                ->find($id);

            $atletas_casa = Parciais::select('posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'apelido', 'foto', 'entrou_em_campo')
                ->join('atletas', function ($q) {

                    $q->on('atletas.atleta_id', 'parciais.atleta_id')
                        ->where('atletas.temporada', $this->temporada);
                })
                ->join('posicoes', function ($q) {

                    $q->on('posicoes.posicao_id', 'parciais.posicao_id')
                        ->where('posicoes.temporada', $this->temporada);
                })
                ->join('clubes', function ($q) {

                    $q->on('clubes.clube_id', 'parciais.clube_id')
                        ->where('clubes.temporada', $this->temporada);
                })
                ->where('parciais.temporada', $this->temporada)
                ->where('parciais.clube_id', $partida->clube_casa_id)
                ->where('parciais.rodada', $partida->rodada)
                ->orderBy('parciais.posicao_id')
                ->get();

            $atleta_id = $atletas_casa->pluck('atleta_id');

            $parciais_atletas_casa = Parciais::whereIn('atleta_id', $atleta_id)
                ->where('temporada', $this->temporada)
                ->where('rodada', $partida->rodada)
                ->get()
                ->keyBy('atleta_id');

            $atletas_visitante = Parciais::select('posicoes.nome as posicao', 'clubes.abreviacao as abreviacao_clube', 'atletas.atleta_id', 'apelido', 'foto', 'entrou_em_campo')
                ->join('atletas', function ($q) {

                    $q->on('atletas.atleta_id', 'parciais.atleta_id')
                        ->where('atletas.temporada', $this->temporada);
                })
                ->join('posicoes', function ($q) {

                    $q->on('posicoes.posicao_id', 'parciais.posicao_id')
                        ->where('posicoes.temporada', $this->temporada);
                })
                ->join('clubes', function ($q) {

                    $q->on('clubes.clube_id', 'parciais.clube_id')
                        ->where('clubes.temporada', $this->temporada);
                })
                ->where('parciais.temporada', $this->temporada)
                ->where('parciais.rodada', $partida->rodada)
                ->where('parciais.clube_id', $partida->clube_visitante_id)
                ->orderBy('parciais.posicao_id')
                ->get();

            $atleta_id = $atletas_visitante->pluck('atleta_id');

            $parciais_atletas_visitante = Parciais::whereIn('atleta_id', $atleta_id)
                ->where('temporada', $this->temporada)
                ->where('rodada', $partida->rodada)
                ->get()
                ->keyBy('atleta_id');

            $clubes = Clubes::where('temporada', $this->temporada)
                ->get()
                ->keyBy('clube_id');

            $scouts = Scouts::select('sigla', 'nome', 'tipo')
                ->where('temporada', $this->temporada)
                ->orderBy('tipo')
                ->get();

            return response()->json([
                'game' => $game,
                'partida' => [
                    'id' => $partida->id,
                    'partida_data' => $partida->partida_data,
                    'local' => $partida->local,
                    'clube_casa' => [
                        'nome' => $clubes[$partida->clube_casa_id]['nome'],
                        'escudo' => $clubes[$partida->clube_casa_id]['60x60'],
                        'atletas' => $atletas_casa,
                        'pontuacao' => $parciais_atletas_casa->sum('pontuacao'),
                        'parciais' => $parciais_atletas_casa
                    ],
                    'clube_visitante' => [
                        'nome' => $clubes[$partida->clube_visitante_id]['nome'],
                        'escudo' => $clubes[$partida->clube_visitante_id]['60x60'],
                        'atletas' => $atletas_visitante,
                        'pontuacao' => $parciais_atletas_visitante->sum('pontuacao'),
                        'parciais' => $parciais_atletas_visitante
                    ]
                ],
                'scouts' => $scouts,
            ]);

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function parciais_time($id)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $rodada_atual = $game->rodada_atual;

            try {

                $client = new Client();
                $response = $client->get("https://api.cartolafc.globo.com/time/id/$id");
                $response = json_decode($response->getBody(), true);

                if (isset($response['mensagem']))
                    return response()->json(['message' => $response['mensagem']], 401);

                if (!count($response['atletas']) && $rodada_atual === 1)
                    return response()->json(['message' => 'Essa aréa só estará funcionando após a primeira rodada.'], 401);

                $clubes = Clubes::where('temporada', $this->temporada)
                    ->get()
                    ->keyBy('clube_id');

                $posicoes = Posicoes::where('temporada', $this->temporada)
                    ->get()
                    ->keyBy('posicao_id');

                $time = $response['time'];

                $time_cartola = TimesCartola::updateOrCreate(
                    [
                        'time_id' => $time['time_id'],
                        'temporada' => $this->temporada
                    ],
                    [
                        'slug' => $time['slug'],
                        'facebook_id' => $time['facebook_id'],
                        'foto_perfil' => $time['foto_perfil'],
                        'nome' => $time['nome'],
                        'nome_cartola' => $time['nome_cartola'],
                        'url_escudo_png' => $time['url_escudo_png'],
                        'pontos_campeonato' => $response['pontos_campeonato'] ?? 0,
                        'patrimonio' => $response['patrimonio'],
                        'assinante' => $time['assinante'],
                    ]
                );

                $rodada_atual = $game->game_over ? 38 : $rodada_atual; //($game->status_mercado != 1 ? $rodada_atual : ($rodada_atual - 1));

                $rodada = TimesCartolaRodadas::selectRaw('MAX(rodada_time_id) as rodada_atual_time')
                    ->where('times_cartolas_id', $time_cartola->id)
                    ->first();

                $rodada_atual_time = is_null($rodada->rodada_atual_time) ? 1 : $rodada->rodada_atual_time;

                while ($rodada_atual_time <= $rodada_atual) :

                    $response = $client->get("https://api.cartola.globo.com/time/id/$id/$rodada_atual_time");
                    $response = json_decode($response->getBody(), true);

                    if (count($response['atletas'])) :

                        DB::transaction(function () use ($client, $response, $rodada_atual_time, $id, $time_cartola, $game) {

                            $atletas = COLLECT($response['atletas'])->keyBy('atleta_id');

                            $pontos_atleta = $atletas[$response['capitao_id']]['pontos_num'] * config('global.multiplicador_capitao');
                            $pontos_multiplicador = $pontos_atleta - $atletas[$response['capitao_id']]['pontos_num'];
                            $pontos_sem_capitao = ($response['pontos'] ?? 0) - $pontos_multiplicador;

                            if ($game->status_mercado != 1 && $rodada_atual_time === $game->rodada_atual) :

                                $substituicao = $client->get("https://api.cartola.globo.com/time/substituicoes/$id/$rodada_atual_time");
                                $substituicao = json_decode($substituicao->getBody(), true);

                                $atleta_id = COLLECT($response['atletas'])->pluck('atleta_id'); //->merge(COLLECT(isset($response['reservas']) ? $response['reservas'] : [])->pluck('atleta_id'));

                                foreach ($substituicao as $val)
                                    $atleta_id->push($val['entrou']['atleta_id']);

                                $parciais = Parciais::select('atleta_id', 'pontuacao')
                                    ->whereIn('atleta_id', $atleta_id)
                                    ->where('rodada', $game->rodada_atual)
                                    ->where('entrou_em_campo', 'Sim')
                                    ->where('temporada', $this->temporada)
                                    ->get();

                                $response['pontos'] = 0;
                                $pontos_sem_capitao = 0;

                                foreach ($parciais as $val) :

                                    $pontos_sem_capitao += $val->pontuacao;
                                    $response['pontos'] += ($val->atleta_id === $response['capitao_id']) ? $val->pontuacao * config('global.multiplicador_capitao') : $val->pontuacao;

                                endforeach;

                            endif;

                            $time_cartola_rodadas = TimesCartolaRodadas::updateOrCreate(
                                [
                                    'rodada_time_id' => $rodada_atual_time,
                                    'times_cartolas_id' => $time_cartola->id,
                                ],
                                [

                                    'capitao_id' => $response['capitao_id'],
                                    'esquema_id' => $response['esquema_id'],
                                    'pontos' => $response['pontos'] ?? 0,
                                    'pontos_sem_capitao' => $pontos_sem_capitao,
                                    'valor_time' => $response['valor_time'],
                                ]
                            );

                            TimesCartolaAtletas::where('rodada_time_id', $rodada_atual_time)
                                ->where('times_cartola_rodadas_id', $time_cartola_rodadas->id)
                                ->delete();

                            foreach ($response['atletas'] as $val) :

                                $player[] = [
                                    'rodada_time_id' => $rodada_atual_time,
                                    'pontos_num' => $val['pontos_num'],
                                    'preco_num' => $val['preco_num'],
                                    'variacao_num' => $val['variacao_num'],
                                    'media_num' => $val['media_num'],
                                    'jogos_num' => $val['jogos_num'],
                                    'times_cartola_rodadas_id' => $time_cartola_rodadas->id,
                                    'atleta_id' => $val['atleta_id'],
                                    'foto' => Str::replace('FORMATO', '220x220', $val['foto']),
                                    'apelido' => $val['apelido'],
                                    'posicao_id' => $val['posicao_id'],
                                    'clube_id' => $val['clube_id'],
                                    'titular' => 'Sim',
                                    'entrou_em_campo' => 'Sim',
                                ];

                            endforeach;

                            if (isset($response['reservas'])) :
                                foreach ($response['reservas'] as $val) :

                                    $player[] = [
                                        'rodada_time_id' => $rodada_atual_time,
                                        'pontos_num' => $val['pontos_num'],
                                        'preco_num' => $val['preco_num'],
                                        'variacao_num' => $val['variacao_num'],
                                        'media_num' => $val['media_num'],
                                        'jogos_num' => $val['jogos_num'],
                                        'times_cartola_rodadas_id' => $time_cartola_rodadas->id,
                                        'atleta_id' => $val['atleta_id'],
                                        'foto' => Str::replace('FORMATO', '220x220', $val['foto']),
                                        'apelido' => $val['apelido'],
                                        'posicao_id' => $val['posicao_id'],
                                        'clube_id' => $val['clube_id'],
                                        'titular' => 'Nâo',
                                        'entrou_em_campo' => 'Nâo',
                                    ];

                                endforeach;
                            endif;

                            $times_cartola_atletas = TimesCartolaAtletas::insert($player);

                            unset($player);
                        }, 3);

                    endif;

                    $rodada_atual_time++;

                endwhile;

                $times_cartola = TimesCartola::join('times_cartola_rodadas', 'times_cartolas_id', 'times_cartolas.id')
                    ->where('times_cartolas_id', $time_cartola->id)
                    ->where('rodada_time_id', '<', $game->rodada_atual)
                    ->where('times_cartolas.temporada', $this->temporada)
                    ->get();

                $geral = COLLECT([]);
                $maior_e_menor_pontuador = COLLECT([]);
                $maior_e_menor_preco = COLLECT([]);
                $destaques = COLLECT([]);
                $variacao = COLLECT([]);
                $variacao = COLLECT([]);
                $capitao = COLLECT([]);

                $posicao = COLLECT([]);
                $mais_escalados = COLLECT([]);
                $clubes_mais_escalados = COLLECT([]);

                if ($times_cartola->count()) :

                    $geral = [
                        'pontos_campeonato' => $time_cartola->pontos_campeonato,
                        'media' => $time_cartola->pontos_campeonato / $times_cartola->count(),
                        'patrimonio' => $time_cartola->patrimonio,
                    ];

                    $maior_pontuacao = $times_cartola->max('pontos');
                    $menor_pontuacao = $times_cartola->min('pontos');

                    $destaques = [
                        'maior_pontuacao' => $maior_pontuacao,
                        'rodada_maior_pontuacao' => $times_cartola->where('pontos', $maior_pontuacao)->first()->rodada_time_id,
                        'menor_pontuacao' => $menor_pontuacao,
                        'rodada_menor_pontuacao' => $times_cartola->where('pontos', $menor_pontuacao)->first()->rodada_time_id,
                    ];

                    $atletas = TimesCartola::select('atleta_id', 'capitao_id', 'times_cartola_atletas.posicao_id', 'clube_id', 'apelido', 'pontos_num', 'foto', 'abreviacao', 'variacao_num', 'preco_num', 'times_cartola_atletas.rodada_time_id')
                        ->join('times_cartola_rodadas', 'times_cartolas_id', 'times_cartolas.id')
                        ->join('times_cartola_atletas', 'times_cartola_rodadas_id', 'times_cartola_rodadas.id')
                        ->join('posicoes', function ($q) {

                            $q->on('posicoes.posicao_id', 'times_cartola_atletas.posicao_id')
                                ->where('posicoes.temporada', $this->temporada);
                        })
                        ->where('times_cartolas_id', $time_cartola->id)
                        ->where('times_cartola_rodadas.rodada_time_id', '<', $game->rodada_atual)
                        ->where('titular', 'Sim')
                        ->where('entrou_em_campo', 'Sim')
                        ->where('times_cartolas.temporada', $this->temporada)
                        ->get();
                    $maior_pontuador = $atletas->max('pontos_num');
                    $menor_pontuador = $atletas->min('pontos_num');

                    $maior_e_menor_pontuador = [
                        'maior_pontuador' => $atletas->where('pontos_num', $maior_pontuador)->first() ?? 0,
                        'menor_pontuador' => $atletas->where('pontos_num', $menor_pontuador)->first() ?? 0,
                    ];

                    $maior_preco = $atletas->max('preco_num');
                    $menor_preco = $atletas->min('preco_num');

                    $maior_e_menor_preco = [
                        'maior_preco' => $atletas->where('preco_num', $maior_preco)->first() ?? 0,
                        'menor_preco' => $atletas->where('preco_num', $menor_preco)->first() ?? 0,
                    ];

                    foreach ($atletas->groupBy('rodada_time_id')->toArray() as $rodada => $val) :

                        foreach ($val as $key => $value) :

                            if ($value['capitao_id'] === $value['atleta_id']) :

                                $capitao->push($value);
                                $val[$key]['pontos_num'] = $value['pontos_num'] * 1.5;
                            // $value['pontos_num'] = $value['pontos_num'] * 1.5;

                            endif;

                        endforeach;

                        $variacao->push([
                            'rodada' => $rodada,
                            'variacao_num' => COLLECT($val)->sum('variacao_num'),
                            'pontos_num' => COLLECT($val)->sum('pontos_num')
                        ]);

                    endforeach;

                    $maior_pontuacao = $capitao->max('pontos_num');
                    $menor_pontuacao = $capitao->min('pontos_num');

                    $capitao = [
                        'lista' => $capitao,
                        'maior_pontuador' => $capitao->where('pontos_num', $maior_pontuacao)->first() ?? 0,
                        'menor_pontuador' => $capitao->where('pontos_num', $menor_pontuacao)->first() ?? 0,
                        'capitao_geral' => [
                            'pontos' => $capitao->sum('pontos_num'),
                            'media' => $capitao->sum('pontos_num') / $capitao->count(),
                        ],
                    ];

                    foreach ($atletas->groupBy('posicao_id')->toArray() as $key => $val) :

                        $posicao->push([
                            'nome' => $posicoes[$key]->nome,
                            'pontos' => COLLECT($val)->sum('pontos_num'),
                            'media' => COLLECT($val)->sum('pontos_num') / COLLECT($val)->count(),
                        ]);

                    endforeach;

                    foreach ($atletas->groupBy('atleta_id')->toArray() as $key => $val) :

                        foreach ($val as $key => $value) :
                            $atleta_id = $value['atleta_id'];
                            $foto = $value['foto'];
                            $apelido = $value['apelido'];
                        endforeach;

                        $mais_escalados->push([
                            'atleta_id' => $atleta_id,
                            'foto' => $foto,
                            'apelido' => $apelido,
                            'escalacao' => COLLECT($val)->count()
                        ]);

                    endforeach;

                    $mais_escalados = $mais_escalados->sortBy([
                        ['escalacao', 'desc'],
                    ]);

                    foreach ($atletas->groupBy('clube_id')->toArray() as $key => $val) :

                        if ($key != 1) :

                            $clubes_mais_escalados->push([
                                'id' => $clubes[$key]->id,
                                'nome' => $clubes[$key]->nome,
                                'escudo' => $clubes[$key]['60x60'],
                                'escalacao' => COLLECT($val)->count()
                            ]);

                        endif;

                    endforeach;

                    $clubes_mais_escalados = $clubes_mais_escalados->sortBy([
                        ['escalacao', 'desc'],
                    ]);

                endif;

                $time = TimesCartola::with(
                    [
                        'rodadas' => function ($q) use ($rodada_atual) {
                            $q->where('rodada_time_id', $rodada_atual);
                        },

                        'rodadas.atletas' => function ($q) use ($rodada_atual) {
                            $q->where('rodada_time_id', $rodada_atual);
                        },

                        'rodadas.reservas' => function ($q) use ($rodada_atual) {
                            $q->where('rodada_time_id', $rodada_atual);
                        }
                    ]
                )
                    ->where('temporada', $this->temporada)
                    ->where('time_id', $id)
                    ->first();

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
                    ->where('temporada', $this->temporada)
                    ->whereIn('atleta_id', $atleta_id)
                    ->where('rodada', $rodada_atual)
                    ->get()
                    ->keyBy('atleta_id');

                $atleta_id = $time->rodadas->atletas->where('entrou_em_campo', 'Sim')->pluck('atleta_id')->merge($time->rodadas->reservas->where('entrou_em_campo', 'Sim')->pluck('atleta_id'));

                $pontos = Parciais::selectRaw('SUM(IF(atleta_id = ' . $time->rodadas->capitao_id . ', pontuacao * 1.5, pontuacao)) as total')
                    ->where('temporada', $this->temporada)
                    ->whereIn('atleta_id', $atleta_id)
                    ->where('rodada', $rodada_atual)
                    ->first();

                $scouts = Scouts::select('sigla', 'nome', 'tipo')
                    ->where('temporada', $this->temporada)
                    ->orderBy('tipo')
                    ->get();

                $response = [
                    'game' => $game,
                    'pontuacao' => $pontos->total,
                    'parciais' => $parciais,
                    'scouts' => $scouts,
                    'time_id' => $id,
                    'time' => $time,
                    'parciais' => $parciais,
                    'geral' => $geral,
                    'destaques' => $destaques,
                    'maior_e_menor_pontuador' => $maior_e_menor_pontuador,
                    'maior_e_menor_preco' => $maior_e_menor_preco,
                    'variacao' => $variacao,
                    'capitao' => $capitao,
                    'posicao' => $posicao,
                    'escalados' => [
                        'atletas' => $mais_escalados->splice(0, 6),
                        'clubes' => $clubes_mais_escalados->splice(0, 6),
                    ]
                ];

                return response()->json($response);
            } catch (QueryException $e) {
                return response()->json(['message' => $e->getMessage()], 400);
            } catch (RequestException $e) {
                $e = json_decode($e->getResponse()->getBody()->getContents(), true);
                return response()->json(['message' => $e['mensagem']], 401);
            } catch (Exception $e) {
                return response()->json(['message' => $e->getMessage()], 400);
            }

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function parciais_liga(Request $request, $slug)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $page = $request->input('page', 1);
            $orderBy = $request->input('orderBy', 'campeonato');

            try {

                $client = new Client();

                $config = Config::find(1);
    
                $headers = ['authorization' => 'Bearer ' . $config->cartola_access_token];

                $response = $client->get("https://api.cartola.globo.com/auth/liga/$slug?orderBy=$orderBy&page=$page", ['headers' => $headers]);
                $response = json_decode($response->getBody(), true);

                // if (isset($response['mensagem']) && $response['mensagem'] === 'Expired'):

                //     $headers = ['Content-Type' => 'application/json'];
                //     $body = json_encode(['access_token' => $config->cartola_access_token]);

                //     $auth = $client->post("https://api.cartola.globo.com/refresh", ['timeout' => 180, 'headers' => $headers, 'body' => $body]);
                //     $auth = json_decode($auth->getBody(), true);

                //     $config->cartola_access_token = $auth['access_token'];
                //     $config->save();

                //     $headers = ['authorization' => 'Bearer ' . $auth['access_token']];

                //     $response = $client->get("https://api.cartola.globo.com/auth/liga/$slug?orderBy=$orderBy&page=$page", ['headers' => $headers]);
                //     $response = json_decode($response->getBody(), true);

                // endif;

                if ($response['liga']['total_times_liga'] > 200)
                    return response()->json(['message' => 'Só é possível carregar ligas de até 200 times.'], 401);

                if ($game->status_mercado != 1) :

                    $parciais = Parciais::where('rodada', $game->rodada_atual)
                        ->where('temporada', $this->temporada)
                        ->get()
                        ->keyBy('atleta_id');

                    $times = $client->get("https://api.cartola.globo.com/liga/" . $response['liga']['liga_id'] . "/times");
                    $times = json_decode($times->getBody(), true);

                    $novo_times = [];

                    foreach ($times as $time_id => $val) :

                        $novo_times[$time_id]['pontuacao'] = 0;

                        foreach ($val['atletas'] as $value) :

                            $novo_times[$time_id]['pontuacao'] += isset($parciais[$value]) ? ($val['capitao'] === $value ? ($parciais[$value]->pontuacao * 1.5) : $parciais[$value]->pontuacao) : 0;

                        endforeach;

                    endforeach;

                    foreach ($response['times'] as $key => $val) :

                        $pontos = isset($novo_times[$val['time_id']]) ? $novo_times[$val['time_id']]['pontuacao'] : 0;
                        $response['times'][$key]['pontuacao'] = $pontos * 100;
                        $response['times'][$key]['pontos']['rodada'] = $pontos;

                    endforeach;

                    usort($response['times'], function ($a, $b) {
                        return $b['pontuacao'] - $a['pontuacao'];
                    });

                    /* paramos aqui */

                    foreach ($response['times'] as $key => $val) :
                        $response['times'][$key]['ranking']['rodada'] = $key + 1;
                    endforeach;

                endif;

                $liga = [
                    'game' => $game,
                    'nome' => $response['liga']['nome'],
                    'descricao' => $response['liga']['descricao'],
                    'total_times_liga' => $response['liga']['total_times_liga'],
                    'nome' => $response['liga']['nome'],
                    'escudo' => $response['liga']['url_flamula_png'],
                    'dono' => $response['time_dono']['nome_cartola'],
                    'times' => $response['times'],
                ];

                if ($orderBy === 'rodada' && $game->rodada_atual > 1) :

                    $lanterna = end($response['times']);
                    $rodada = reset($response['times']);

                    $patrimonio = array_filter($response['times'], function ($var) {
                        return ($var['ranking']['patrimonio'] === 1);
                    });

                    $patrimonio = reset($patrimonio);

                    $liga['destaques'] = [
                        'lanterninha' => [
                            'nome' => $lanterna['nome'],
                            'nome_cartola' => $lanterna['nome_cartola'],
                            'escudo' => $lanterna['url_escudo_png'],
                            'pontos' => $lanterna['pontos']['rodada'],
                        ],
                        'patrimonio' => [
                            'nome' => $patrimonio['nome'],
                            'nome_cartola' => $patrimonio['nome_cartola'],
                            'escudo' => $patrimonio['url_escudo_png'],
                            'pontos' => $patrimonio['patrimonio'],
                        ],
                        'rodada' => [
                            'nome' => $rodada['nome'],
                            'nome_cartola' => $rodada['nome_cartola'],
                            'escudo' => $rodada['url_escudo_png'],
                            'pontos' => $rodada['pontos']['rodada'],
                        ]
                    ];

                elseif ($orderBy === 'rodada') :

                    $liga['destaques'] = [
                        'lanterninha' => [
                            'nome' => null,
                            'nome_cartola' => null,
                            'escudo' => null,
                            'pontos' => null
                        ],
                        'patrimonio' => [
                            'nome' => null,
                            'nome_cartola' => null,
                            'escudo' => null,
                            'pontos' => null
                        ],
                        'rodada' => [
                            'nome' => null,
                            'nome_cartola' => null,
                            'escudo' => null,
                            'pontos' => null
                        ]
                    ];

                endif;

                return response()->json($liga);
            } catch (RequestException $e) {
                $e = json_decode($e->getResponse()->getBody()->getContents(), true);
                return response()->json(['message' => $e['mensagem']], 401);
            } catch (Exception $e) {
                return response()->json(['message' => $e->getMessage()], 400);
            }

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function partidas(Request $request)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $rodada = $request->input('rodada', $game->rodada_atual);

            $partidas = Partidas::select('id', 'clube_casa_id', 'clube_visitante_id', 'placar_oficial_mandante', 'placar_oficial_visitante')
                ->selectRaw('DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data')
                ->where('temporada', $this->temporada)
                ->where('rodada', $rodada)
                ->get();

            $clubes = Clubes::get()->keyBy('clube_id');

            return response()->json([
                'rodada_atual' => $game->rodada_atual,
                'partidas' => $partidas,
                'clubes' => $clubes,
            ]);

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function ligas(Request $request)
    {

        $regras = [
            'nome_liga' => 'required',
        ];

        $mensagens = [
            'nome_liga.required' => 'O campo nome_liga é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        try {

            $client = new Client();

            $response = $client->get('https://api.cartola.globo.com/ligas?&q=' . $request->nome_liga);
            $response = json_decode($response->getBody(), true);

            return response()->json($response);
        } catch (RequestException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function times(Request $request)
    {

        $regras = [
            'nome_time' => 'required',
        ];

        $mensagens = [
            'nome_time.required' => 'O campo nome_time é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        try {

            $client = new Client();

            $response = $client->get('https://api.cartolafc.globo.com/times?q=' . $request->nome_time);
            $response = json_decode($response->getBody(), true);

            return response()->json($response);
        } catch (RequestException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function time_rodada(Request $request, $id)
    {

        $rodada_atual = $request->rodada;

        $time = TimesCartola::with(
            [
                'rodadas' => function ($q) use ($rodada_atual) {
                    $q->where('rodada_time_id', $rodada_atual);
                },

                'rodadas.atletas' => function ($q) use ($rodada_atual) {
                    $q->where('rodada_time_id', $rodada_atual);
                },

                'rodadas.reservas' => function ($q) use ($rodada_atual) {
                    $q->where('rodada_time_id', $rodada_atual);
                }
            ]
        )
            ->where('temporada', $this->temporada)
            ->where('time_id', $id)
            ->first();

        if (!$time->rodadas)
            return response()->json(['message' => "Time não foi escalado para a rodada $rodada_atual."], 401);

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
            ->where('temporada', $this->temporada)
            ->whereIn('atleta_id', $atleta_id)
            ->where('rodada', $rodada_atual)
            ->get()
            ->keyBy('atleta_id');

        $atleta_id = $time->rodadas->atletas->where('entrou_em_campo', 'Sim')->pluck('atleta_id')->merge($time->rodadas->reservas->where('entrou_em_campo', 'Sim')->pluck('atleta_id'));

        $pontos = Parciais::selectRaw('SUM(IF(atleta_id = ' . $time->rodadas->capitao_id . ', pontuacao * 1.5, pontuacao)) as total')
            ->where('temporada', $this->temporada)
            ->whereIn('atleta_id', $atleta_id)
            ->where('rodada', $rodada_atual)
            ->first();

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->where('temporada', $this->temporada)
            ->orderBy('tipo')
            ->get();

        return response()->json([
            'pontuacao' => $pontos->total,
            'parciais' => $parciais,
            'scouts' => $scouts,
            'time' => $time,
        ]);
    }
}
