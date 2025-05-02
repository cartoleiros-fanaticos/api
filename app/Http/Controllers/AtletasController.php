<?php

namespace App\Http\Controllers;

use App\Models\Atletas;
use App\Models\Clubes;
use App\Models\Config;
use App\Models\Destaques;
use App\Models\Game;
use App\Models\Parciais;
use App\Models\Posicoes;
use App\Models\Scouts;
use App\Models\Status;
use Illuminate\Http\Request;
use Carbon\Carbon;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Validator;
use Exception;
use DB;

class AtletasController extends Controller
{

    private $temporada;

    public function __construct(Request $request)
    {
        $this->temporada = $request->input('temporada', Carbon::now()->format('Y'));
    }

    public function index(Request $request)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $atletas = Atletas::select('atleta_id', 'apelido', 'foto', 'variacao_num', 'preco_num', 'pontos_num', 'media_num', 'jogos_num', 'minimo_para_valorizar', 'clube_id', 'posicao_id', 'status_id', 'rodada_id', 'A', 'G', 'CA', 'CV', 'DP', 'FC', 'FD', 'FF', 'FS', 'FT', 'GC', 'GS', 'I', 'PP', 'DS', 'SG', 'PS', 'PC', 'DE')
                ->selectRaw('(SELECT CONCAT(clube_casa_id, \'x\',  clube_visitante_id) FROM partidas WHERE temporada = ' . $this->temporada . ' AND rodada = ' . $game->rodada_atual . ' AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id)) AS confronto')
                ->where(function ($q) use ($request) {

                    if ($request->clube_id)
                        $q->where('clube_id', $request->clube_id);

                    if ($request->posicao_id)
                        $q->where('posicao_id', $request->posicao_id);

                    if ($request->status_id)
                        $q->where('status_id', $request->status_id);
                })
                ->where('temporada', $this->temporada)
                ->orderBy(($request->scout ?? 'preco_num'), 'DESC')
                ->get();

            $clubes = Clubes::select('clube_id as id', 'nome', 'abreviacao', '60x60')
                ->where('temporada', $this->temporada)
                ->get()
                ->keyBy('id');

            $posicoes = Posicoes::select('posicao_id as id', 'nome')
                ->where('temporada', $this->temporada)
                ->get()
                ->keyBy('id');

            $status = Status::select('status_id as id', 'nome')
                ->where('temporada', $this->temporada)
                ->get()
                ->keyBy('id');

            $scouts = Scouts::select('sigla', 'nome', 'tipo')
                ->where('temporada', $this->temporada)
                ->orderBy('tipo')
                ->get();

            return response()->json([
                'atletas' => $atletas,
                'clubes' => $clubes,
                'posicoes' => $posicoes,
                'status' => $status,
                'scouts' => $scouts,
            ]);

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function show(Request $request, string $id)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        $atleta = DB::SELECT('
                SELECT 
                    atleta_id,
                    apelido,
                    foto,
                    variacao_num,
                    preco_num,
                    pontos_num,
                    media_num,
                    jogos_num,
                    clube_id,
                    posicoes.nome as posicao_nome,
                    atletas.posicao_id,
                    status_id,
                    rodada_id,
                    observacao,
                    G,
                    A,
                    DS,
                    FD,
                    FF,
                    FT,
                    FS,
                    GS,
                    SG,
                    DP,
                    GC,
                    CA,
                    CV,
                    FC,
                    I,
                    PP,
                    PS,
                    PC,
                    DE,
                    V,

                    clube_casa_id,
                    clube_visitante_id,
                    DATE_FORMAT(partida_data, "%d/%m %H:%i") partida_data,
                    IF(clube_id = clube_visitante_id, \'mandante\', \'visitante\') as mando

                FROM atletas
                INNER JOIN partidas ON rodada = ? AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id) AND partidas.temporada = ?
                INNER JOIN posicoes ON posicoes.posicao_id = atletas.posicao_id AND posicoes.temporada = ?
                WHERE atleta_id = ? AND atletas.temporada = ?
            ', [$game->rodada_atual, $this->temporada, $this->temporada, $id, $this->temporada])[0];

        $geral = DB::select('
                SELECT 
                    IFNULL(SUM(pontuacao), 0) pontuacao,
                    IFNULL(AVG(pontuacao), 0) media,
                    COUNT(partidas.id) jogos
                FROM parciais 
                INNER JOIN partidas ON partidas.rodada = parciais.rodada AND (clube_casa_id = clube_id OR clube_visitante_id = clube_id) AND partidas.temporada = ?
                WHERE atleta_id = ? AND parciais.temporada = ?
            ', [$this->temporada, $id, $this->temporada])[0];

        $casa = DB::select('
                SELECT 
                    IFNULL(SUM(pontuacao), 0) pontuacao,
                    IFNULL(AVG(pontuacao), 0) media,
                    COUNT(partidas.id) jogos
                FROM parciais
                INNER JOIN partidas ON partidas.rodada = parciais.rodada AND clube_casa_id = clube_id AND partidas.temporada = ?
                WHERE atleta_id = ? AND parciais.temporada = ?
            ', [$this->temporada, $id, $this->temporada])[0];

        $fora = DB::select('
                SELECT 
                    IFNULL(SUM(pontuacao), 0) pontuacao,
                    IFNULL(AVG(pontuacao), 0) media,
                    COUNT(partidas.id) jogos
                FROM parciais
                INNER JOIN partidas ON partidas.rodada = parciais.rodada AND clube_visitante_id = clube_id AND partidas.temporada = ?
                WHERE atleta_id = ? AND parciais.temporada = ?
                ', [$this->temporada, $id, $this->temporada])[0];

        $atleta->pontuacao = [
            'geral' => $geral->pontuacao,
            'casa' => $casa->pontuacao,
            'fora' => $fora->pontuacao,
        ];

        $atleta->media = [
            'geral' => $geral->media,
            'casa' => $casa->media,
            'fora' => $fora->media,
        ];

        $atleta->jogos = [
            'geral' => $geral->jogos,
            'casa' => $casa->jogos,
            'fora' => $fora->jogos,
        ];

        $clubes = COLLECT(DB::SELECT('
                SELECT 
                    clube_id as id,
                    nome,
                    abreviacao,
                    60x60 as escudo
                FROM clubes
                WHERE clube_id IN (?, ?) and temporada = ?
            ', [$atleta->clube_casa_id, $atleta->clube_visitante_id, $this->temporada]))
            ->keyBy('id');

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->where('temporada', $this->temporada)
            ->orderBy('tipo')
            ->get();

        // $games = Game::where('temporada', Carbon::now()->format('Y'))
        //     ->first();

        $rodadas = COLLECT([]);

        // $games->game_over = 1;
        // $atleta->rodada_id = 38;

        //$a = 1;
        $qtde_rodada = 7;
        // $rodada = $game->game_over ? $atleta->rodada_id : $atleta->rodada_id;

        // while ($a <= 38) :
        //     $rodadas->push($a . 'º rodada');
        //     $a++;
        // endwhile;

        $rodadas = Parciais::select('rodada')
            ->where('temporada', $this->temporada)
            ->where('atleta_id', $id)
            ->get()->transform(function ($i) {
                return $i['rodada'] . 'º rodada';
            });

        // foreach ($rodadas as $val)
        //     $rodadas->push($val->rodada . 'º rodada');

        if ($rodadas->count() <= $qtde_rodada) $rodadas->splice($qtde_rodada);
        else $rodadas = $rodadas->splice($rodadas->count() - $qtde_rodada, $qtde_rodada);

        $parciais = COLLECT(
            DB::SELECT('
                SELECT 
                    parciais.rodada,
                    ROUND(IFNULL(pontuacao, 0), 2) as pontuacao,
                    ROUND(IFNULL(variacao_num, 0), 2) as variacao_num   
                FROM parciais 
                WHERE atleta_id = ? AND temporada = ?
                LIMIT ?
                OFFSET ?
            ', [$id, $this->temporada, $qtde_rodada, $rodadas->count() <= $qtde_rodada ? 0 : $rodadas->count() - $qtde_rodada])
        );

        return response()->json([
            'rodada' => $game->game_over ? $atleta->rodada_id : $atleta->rodada_id,
            'atleta' => $atleta,
            'clubes' => $clubes,
            'scouts' => $scouts,
            'grafico' => [
                'rodadas' => $rodadas->all(),
                'pontuacao' => $rodadas->count() ? $parciais->pluck('pontuacao') : [],
                'variacao_num' => $rodadas->count() ? $parciais->pluck('variacao_num') : [],
            ]
        ]);
    }

    public function compare(Request $request)
    {

        $regras = [
            'atleta_a' => 'required',
            'atleta_b' => 'required'
        ];

        $mensagens = [
            'atleta_a.required' => 'O campo atleta_a é obrigatório.',
            'atleta_b.required' => 'O campo atleta_b é obrigatório.'
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $user = auth('api')->user();

        if ($user->plano === 'Free Cartoleiro')
            return response()->json(['message' => 'Plano exclusivo para sócio cartoleiro fanático.'], 401);

        function atletas($id, $temporada)
        {

            $response = DB::SELECT(
                '
                    SELECT	                
                        foto,
                        atleta_id,
                        apelido,
                        clubes.nome,
                        clubes.60x60 as escudo,
                        preco_num,
                        pontos_num,
                        media_num,
                        jogos_num,
                        minimo_para_valorizar,	
                    
                        G,
                        A,
                        DS,
                        (FF + FT + FD + G) as finalizacao,
                        I,
                        (CA + CV) as cartoes,
                        DE,
                        FS,
                        FC,
                        
                        ROUND(IFNULL(G / jogos_num, 0), 2) as media_gols,
                        ROUND(IFNULL(A / jogos_num, 0), 2) as media_assistencia,
                        ROUND(IFNULL(DS / jogos_num, 0), 2) as media_roubos,
                        ROUND(IFNULL((FF + FT + FD + G) / jogos_num, 0), 2) as media_finalizacao,
                        ROUND(IFNULL(I / jogos_num, 0), 2) as media_impedimento,
                        ROUND(IFNULL((CA + CV) / jogos_num, 0), 2) as media_cartoes,
                        ROUND(IFNULL(DE / jogos_num, 0), 2) as media_defesa,
                        ROUND(IFNULL(FS / jogos_num, 0), 2) as media_falta_sofrida,
                        ROUND(IFNULL(FC / jogos_num, 0), 2) as media_falta_cometida,

                        (
                            SELECT 
                                IFNULL(AVG(pontuacao), 0)
                            FROM parciais 
                            WHERE atleta_id = ? AND rodada IN (SELECT rodada FROM partidas WHERE valida = 1 AND clube_casa_id IN (clube_id)) AND temporada = ?
                        ) as media_pontos_casa,

                        (
                            SELECT 
                                IFNULL(AVG(pontuacao), 0)
                            FROM parciais 
                            WHERE atleta_id = ? AND rodada IN (SELECT rodada FROM partidas WHERE valida = 1 AND clube_visitante_id IN (clube_id)) AND temporada = ?
                        ) as media_pontos_fora  
                            
                    FROM 
                        atletas
                    JOIN 
                        clubes ON atletas.clube_id = clubes.clube_id AND clubes.temporada = ?
                    WHERE
                        atleta_id = ? AND atletas.temporada = ?
                ',
                [$id, $temporada, $id, $temporada, $temporada, $id, $temporada]
            )[0];

            $pontos = Parciais::selectRaw('IFNULL(MIN(pontuacao), 0) as pontuacao_minima')
                ->selectRaw('IFNULL(MAX(pontuacao), 0) as pontuacao_maxima')
                ->where('temporada', $temporada)
                ->where('atleta_id', $id)
                ->first();

            $response->pontuacao_minima = $pontos->pontuacao_minima;
            $response->pontuacao_maxima = $pontos->pontuacao_maxima;

            return $response;
        }

        return response()->json([
            'atleta_a' => atletas($request->atleta_a, $this->temporada),
            'atleta_b' => atletas($request->atleta_b, $this->temporada),
        ]);
    }

    public function pontos_cedidos(Request $request)
    {

        $regras = [
            'time_id' => 'required',
            'posicao_id' => 'required'
        ];

        $mensagens = [
            'time_id.required' => 'O campo time_id é obrigatório.',
            'posicao_id.required' => 'O campo posicao_id é obrigatório.'
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $time_id = $request->time_id;
        $posicao_id = $request->posicao_id;

        $game = Game::where('temporada', $this->temporada)
            ->first();

        $posicao = Posicoes::where('temporada', $this->temporada)
            ->where('posicao_id', $posicao_id)
            ->first();

        $time = DB::SELECT('
            SELECT 
                nome,
                30x30 as escudo,
                IF(clubes.clube_id = clube_visitante_id, \'visitante\', \'mandante\') as mando
            FROM clubes 
            INNER JOIN partidas ON (clube_casa_id = clubes.clube_id OR clube_visitante_id = clubes.clube_id) AND partidas.temporada = ?
            WHERE clubes.clube_id = ? AND rodada = ? AND clubes.temporada = ? 
        ', [$this->temporada, $time_id, $game->rodada_atual, $this->temporada]);

        if (!isset($time[0]))
            return response()->json(['message' => 'Ainda não existe dados.'], 400);

        $time = $time[0];

        if ($time->mando === 'visitante') :

            $confrontos = DB::SELECT('
                    SELECT 
                        clubes.clube_id as id,
                        CONCAT(nome, \' x \', ?) as confronto,
                        30x30 as escudo_casa,
                        ? as escudo_fora,
                        rodada,
                        DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data
                    FROM partidas
                    INNER JOIN clubes ON clube_casa_id = clubes.clube_id AND clubes.temporada = ?
                    WHERE clube_visitante_id = ? AND valida = 1 AND rodada != ? AND partidas.temporada = ?
                ', [$time->nome, $time->escudo, $this->temporada, $time_id, $game->rodada_atual, $this->temporada]);

        else :

            $confrontos = DB::SELECT('
                SELECT 
                    clubes.clube_id as id,
                    CONCAT(?, \' x \', nome) as confronto,
                    ? as escudo_casa,
                    30x30 as escudo_fora,
                    rodada,
                    DATE_FORMAT(partida_data, "%d/%m %H:%i") as partida_data
                FROM partidas
                INNER JOIN clubes ON clube_visitante_id = clubes.clube_id AND clubes.temporada = ?
                WHERE clube_casa_id = ? AND valida = 1 AND rodada != ? AND partidas.temporada = ?
            ', [$time->nome, $time->escudo, $this->temporada, $time_id, $game->rodada_atual, $this->temporada]);

        endif;

        foreach ($confrontos as $confronto) :

            $confronto->atletas = DB::SELECT('
                    SELECT
                        atletas.atleta_id,
                        atletas.foto,
                        atletas.apelido,
                        atletas.preco_num,
                        clubes.abreviacao as abreviacao_clube,
                        posicoes.nome as posicao,
                        parciais.clube_id,
                        entrou_em_campo,
                        pontuacao,
                        parciais.A,
                        parciais.G,
                        parciais.CA,
                        parciais.CV,
                        parciais.DP,
                        parciais.FC,
                        parciais.FD,
                        parciais.FF,
                        parciais.FS,
                        parciais.FT,
                        parciais.GC,
                        parciais.GS,
                        parciais.I,
                        parciais.PP,
                        parciais.DS,
                        parciais.SG,
                        parciais.PS,
                        parciais.PC,
                        parciais.DE
                    FROM parciais 
                    INNER JOIN atletas ON parciais.atleta_id = atletas.atleta_id AND atletas.temporada = ?
                    INNER JOIN posicoes ON posicoes.posicao_id = parciais.posicao_id AND posicoes.temporada = ?
                    INNER JOIN clubes ON clubes.clube_id = parciais.clube_id AND clubes.temporada = ?
                    WHERE atletas.clube_id = ? AND rodada = ? AND atletas.posicao_id = ? AND parciais.temporada = ?
                    ORDER BY pontuacao DESC
                ', [$this->temporada,  $this->temporada,  $this->temporada, $confronto->id, $confronto->rodada, $posicao_id, $this->temporada]);

            $confronto->pontuacao_total = COLLECT($confronto->atletas)->sum('pontuacao');

        endforeach;

        $scouts = Scouts::select('sigla', 'nome', 'tipo')
            ->where('temporada', $this->temporada)
            ->orderBy('tipo')
            ->get();

        $parciais = COLLECT([]);

        if (COLLECT($confrontos)->count()) :
            foreach ($confrontos as $key => $val) :
                foreach ($val->atletas as $key => $value) :
                    $parciais->push($value);
                endforeach;
            endforeach;
        endif;

        return response()->json([
            'time' => $time,
            'posicao' => $posicao,
            'confrontos' => $confrontos,
            'parciais' => $parciais->keyBy('atleta_id'),
            'scouts' => $scouts,
        ]);
    }

    public function destaques(Request $request)
    {

        $game = Game::where('temporada', $this->temporada)
            ->first();

        if ($game) :

            $response = Destaques::where('rodada', $game->rodada_atual)
                ->where('temporada', $this->temporada)
                ->orderBy('tipo')
                ->orderBy('escalacoes', 'DESC')
                ->get()
                ->groupBy('tipo');

            return response()->json($response);

        else :

            return response()->json(['status' => 'Fechado', 'message' => 'Ainda não foi aberta a temporada ' . $this->temporada]);

        endif;
    }

    public function tem_atleta(Request $request, $atleta_id, $liga_id)
    {
        try {

            $client = new Client();
            $data = $client->get("https://api.cartola.globo.com/liga/$liga_id/times");
            $data = json_decode($data->getBody(), true);

            $config = Config::find(1);

            $headers = ['authorization' => 'Bearer ' . $config->cartola_access_token];

            $liga = $client->get("https://api.cartola.globo.com/auth/liga/$request->slug", ['headers' => $headers]);
            $liga = json_decode($liga->getBody(), true);

            if ($liga['liga']['total_times_liga'] > 200)
                return response()->json(['message' => 'Só é possível carregar ligas de até 200 times.'], 401);

            $times = [];

            foreach ($liga['times'] as $val) :

                $times[] = [
                    'time_id' => $val['time_id'],
                    'nome' => $val['nome'],
                    'nome_cartola' => $val['nome_cartola'],
                    'url_escudo_png' => $val['url_escudo_png'],
                ];

            endforeach;

            $game = Game::first();

            $atleta = Atletas::select('atleta_id', 'apelido', 'foto', 'posicoes.nome as posicao_nome', 'posicoes.abreviacao as posicao_abreviacao', 'clubes.nome as clube', '60x60 as escudo')
                ->selectRaw('IFNULL((SELECT pontuacao FROM parciais WHERE rodada = ' . $game->rodada_atual . ' AND atleta_id = atletas.atleta_id), 0) pontuacao')
                ->join('clubes', 'clubes.clube_id', 'atletas.clube_id')
                ->join('posicoes', 'posicoes.posicao_id', 'atletas.posicao_id')
                ->where('atleta_id', $atleta_id)
                ->first();

            $response = [
                'atleta' => $atleta,
                'sim' => [],
                'nao' => [],
            ];

            $parciais = Parciais::where('rodada', $game->rodada_atual)
                ->get()
                ->keyBy('atleta_id');

            foreach ($data as $time_id => $val) :

                $pontos = 0;
                $time = COLLECT($times)->keyBy('time_id');
                $capitao = $val['capitao'] == $atleta_id ? 'Sim' : 'Não';

                foreach ($val['atletas'] as $value)
                    $pontos += isset($parciais[$value]) ? ($val['capitao'] == $value ? ($parciais[$value]->pontuacao * 1.5) : $parciais[$value]->pontuacao) : 0;

                if (in_array($atleta_id, $val['atletas'])) :

                    $response['sim'][] = [
                        'capitao' => $capitao,
                        'pontos' => $pontos,
                        'time' => $time[$time_id],
                    ];

                else :

                    $response['nao'][] = [
                        'capitao' => $capitao,
                        'pontos' => $pontos,
                        'time' => $time[$time_id]
                    ];

                endif;

            endforeach;

            return response()->json($response);
        } catch (QueryException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (RequestException $e) {
            $e = json_decode($e->getResponse()->getBody()->getContents(), true);
            return response()->json(['message' => $e['mensagem']], 401);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
