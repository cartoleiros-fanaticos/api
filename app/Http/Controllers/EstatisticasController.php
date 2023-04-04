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

    public function times(Request $request){

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

            // $geral = Times::join('times_por_rodadas', 'times.id', 'times_por_rodadas.time_id')
            //     ->selectRaw('SUM(pontos) as pontos')
            //     ->selectRaw('AVG(pontos) as media')
            //     ->selectRaw('(SELECT patrimonio FROM times_por_rodadas as team_round INNER JOIN times ON team_round.time_id = times.id WHERE times.time_id = "' . $time_id . '" ORDER BY team_round.id DESC LIMIT 1) as patrimonio')
            //     ->where('times.time_id', $time_id)
            //     ->first();

            $geral = [
                'pontos_campeonato' => $time_cartola->pontos_campeonato,
                'patrimonio' => $time_cartola->patrimonio,
            ];

            return $geral;

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
