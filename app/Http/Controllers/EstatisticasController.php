<?php

namespace App\Http\Controllers;

use App\Models\Clubes;
use App\Models\Game;
use App\Models\Posicoes;
use App\Models\TimesCartola;
use App\Models\TimesCartolaAtletas;
use App\Models\TimesCartolaRodadas;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Validator;
use Exception;
use Log;
use DB;

class EstatisticasController extends Controller
{

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

        $client = new Client();

        $response = $client->get('https://api.cartolafc.globo.com/times?q=' . $request->nome_time);
        $response = json_decode($response->getBody(), true);

        return response()->json($response);
    }

    public function time($id)
    {

        $game = Game::first();

        $rodada_atual = $game->rodada_atual;

        try {

            $client = new Client();
            $response = $client->get("https://api.cartolafc.globo.com/time/id/$id");
            $response = json_decode($response->getBody(), true);

            // if (isset($response['mensagem']))
            //     return response()->json(['message' => $response['mensagem']], 401);

            // if (!count($response['atletas']) && $rodada_atual === 1)
            //     return response()->json(['message' => 'Essa aréa só estará funcionando após a primeira rodada.'], 401);

            $clubes = Clubes::get()
                ->keyBy('id');

            $posicoes = Posicoes::get()
                ->keyBy('id');

            $time = $response['time'];

            $time_cartola = TimesCartola::updateOrCreate(
                [
                    'time_id' => $time['time_id']
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

            $rodada_atual = $game->game_over ? 38 : ($rodada_atual - 1);

            $rodada = TimesCartolaRodadas::selectRaw('MAX(rodada_time_id) as rodada_atual_time')->first();

            $rodada_atual_time = is_null($rodada->rodada_atual_time) ? 1 : $rodada->rodada_atual_time;

            while ($rodada_atual_time <= $rodada_atual) :

                $response = $client->get("https://api.cartolafc.globo.com/time/id/$id/$rodada_atual_time");
                $response = json_decode($response->getBody(), true);

                if (count($response['atletas'])) :

                    DB::transaction(function () use ($response, $rodada_atual_time, $time_cartola) {

                        $time_cartola_rodadas = new TimesCartolaRodadas;

                        $time_cartola_rodadas->capitao_id = $response['capitao_id'];
                        $time_cartola_rodadas->esquema_id = $response['esquema_id'];
                        $time_cartola_rodadas->rodada_time_id = $rodada_atual_time;
                        $time_cartola_rodadas->patrimonio = $response['patrimonio'];
                        $time_cartola_rodadas->pontos = $response['pontos'] ?? 0;
                        $time_cartola_rodadas->valor_time = $response['valor_time'];
                        $time_cartola_rodadas->times_cartolas_id = $time_cartola->id;

                        $time_cartola_rodadas->save();

                        foreach ($$response['atletas'] as $val) :

                            $player[] = [
                                'rodada_time_id' => $val['rodada_id'],
                                'pontos_num' => $val['pontos_num'],
                                'preco_num' => $val['preco_num'],
                                'variacao_num' => $val['variacao_num'],
                                'media_num' => $val['media_num'],
                                'jogos_num' => $val['jogos_num'],
                                'times_cartola_rodadas_id' => $time_cartola_rodadas->id,
                                'atleta_id' => $val['atleta_id'],
                                'foto' => $val['foto'],
                                'apelido' => $val['apelido'],
                                'posicao_id' => $val['posicao_id'],
                            ];

                        endforeach;

                        if (isset($response['reservas'])) :
                            foreach ($response['reservas'] as $val) :

                                $player[] = [
                                    'rodada_time_id' => $val['rodada_id'],
                                    'pontos_num' => $val['pontos_num'],
                                    'preco_num' => $val['preco_num'],
                                    'variacao_num' => $val['variacao_num'],
                                    'media_num' => $val['media_num'],
                                    'jogos_num' => $val['jogos_num'],
                                    'times_cartola_rodadas_id' => $time_cartola_rodadas->id,
                                    'atleta_id' => $val['atleta_id'],
                                    'foto' => $val['foto'],
                                    'apelido' => $val['apelido'],
                                    'posicao_id' => $val['posicao_id'],
                                    'tipo' => 'Reserva',
                                    'valido' => 'Não'
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
                ->get();

            $geral = COLLECT([]);
            $maior_e_menor = COLLECT([]);
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

                $atletas = TimesCartola::select('atleta_id', 'capitao_id', 'apelido', 'pontos_num', 'foto', 'abreviacao', 'variacao_num', 'pontos_num', 'preco_num', 'times_cartola_atletas.rodada_time_id')
                    ->join('times_cartola_rodadas', 'times_cartolas_id', 'times_cartolas.id')
                    ->join('times_cartola_atletas', 'times_cartola_rodadas_id', 'times_cartola_rodadas.id')
                    ->join('posicoes', 'posicao_id', 'posicoes.id')
                    ->where('times_cartolas_id', $time_cartola->id)
                    ->where('titular', 'Sim')
                    ->get();

                $maior_pontuacao = $times_cartola->max('pontos_num');
                $menor_pontuacao = $times_cartola->min('pontos_num');

                $maior_e_menor = [
                    'maior_pontuacao' => $atletas->where('pontos_num', $maior_pontuacao)->first() ?? 0,
                    'menor_pontuacao' => $atletas->where('pontos_num', $menor_pontuacao)->first() ?? 0,
                ];


                // $atletas = COLLECT([
                //     [
                //         'rodada_time_id' => 1,
                //         'apelido' => 'Wedson',
                //         'foto' => 'image.jpg',
                //         'atleta_id' => 1,
                //         'pontos_num' => 1,
                //         'variacao_num' => 1,
                //         'capitao_id' => 2,
                //         'posicao_id' => 5,
                //         'clube_id' => 262,
                //     ],
                //     [
                //         'rodada_time_id' => 1,
                //         'apelido' => 'Cândido',
                //         'foto' => 'image.jpg',
                //         'atleta_id' => 2,
                //         'pontos_num' => 5,
                //         'variacao_num' => 4,
                //         'capitao_id' => 2,
                //         'posicao_id' => 5,
                //         'clube_id' => 262,
                //     ],
                //     [
                //         'rodada_time_id' => 2,
                //         'apelido' => 'Wedson',
                //         'foto' => 'image.jpg',
                //         'atleta_id' => 1,
                //         'pontos_num' => 1,
                //         'variacao_num' => 1,
                //         'capitao_id' => 2,
                //         'posicao_id' => 3,
                //         'clube_id' => 263,
                //     ],
                //     [
                //         'rodada_time_id' => 2,
                //         'apelido' => 'Cândido',
                //         'foto' => 'image.jpg',
                //         'atleta_id' => 2,
                //         'pontos_num' => 3,
                //         'variacao_num' => 2,
                //         'capitao_id' => 2,
                //         'posicao_id' => 3,
                //         'clube_id' => 264,
                //     ],
                //     [
                //         'rodada_time_id' => 2,
                //         'apelido' => 'Ailson',
                //         'foto' => 'image.jpg',
                //         'atleta_id' => 3,
                //         'pontos_num' => 2,
                //         'variacao_num' => 1,
                //         'capitao_id' => 2,
                //         'posicao_id' => 3,
                //         'clube_id' => 264,
                //     ]
                // ]);

                foreach ($atletas->groupBy('rodada_time_id')->toArray() as $rodada => $val) :

                    foreach ($val as $key => $value) :

                        if ($value['capitao_id'] === $value['atleta_id']) :

                            $val[$key]['pontos_num'] = $value['pontos_num'] * 1.5;
                            $value['pontos_num'] = $value['pontos_num'] * 1.5;
                            $capitao->push($value);

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

                foreach ($atletas->groupBy('clube_id')->toArray() as $key => $val) :

                    $clubes_mais_escalados->push([
                        'id' => $clubes[$key]->id,
                        'nome' => $clubes[$key]->nome,
                        'escudo' => $clubes[$key]['60x60'],
                        'escalacao' => COLLECT($val)->count()
                    ]);

                endforeach;

            endif;

            $response = [
                'time_id' => $id,
                'rodada_atual' => $game->rodada_atual,
                'geral' => $geral,
                'destaques' => $destaques,
                'maior_e_menor' => $maior_e_menor,
                'variacao' => $variacao,
                'capitao' => $capitao,
                'posicao' => $posicao,
                'escalados' => [
                    'atletas' => $mais_escalados,
                    'clubes' => $clubes_mais_escalados
                ]
            ];

            return response()->json($response);
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
}