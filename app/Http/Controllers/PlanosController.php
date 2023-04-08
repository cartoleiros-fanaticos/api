<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Game;
use App\Models\Planos;
use App\Models\Transacoes;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Validator;
use GuzzleHttp\Client;

use GuzzleHttp\Exception\RequestException;
use Illuminate\Database\QueryException;
use Exception;
use Log;
use DB;

class PlanosController extends Controller
{

    public function index(Request $request)
    {
        $response = Planos::get();
        return response()->json($response);
    }

    public function cobrancaPix(Request $reques, $id)
    {
        $plano = Planos::find($id);

        $config = Config::first();

        if (!$config->mp_access_token)
            return response()->json(['message' => 'Ainda não foi configurado as credenciais de pagamento.'], 401);

        $user = auth('api')->user();

        $transacao = new Transacoes();
        $transacao->valor = $plano->valor;
        $transacao->operacao = 'Depósito';
        $transacao->observacao = "Contratação $plano->nome";
        $transacao->pago = 'Não';
        $transacao->comissao = $user->comissao_admin / 100 * (float) $plano->valor;
        $transacao->usuarios_id = $user->id;

        $headers = [
            'Content-Type' => 'application/json',
            'Authorization' => "Bearer $config->mp_access_token"
        ];

        $body = json_encode([
            'transaction_amount' => $plano->valor,
            'description' => "Contratação $plano->nome",
            'external_reference' => $plano->nome,
            'notification_url' => 'https://cartoleirofanatico.com.br/api/notificacao-pix',
            'payment_method_id' => "pix",
            'payer' => [
                "email" => $user->email,
            ]
        ]);

        try {

            $client = new Client();
            $payment = $client->post('https://api.mercadopago.com/v1/payments', ['timeout' => 60, 'headers' => $headers, 'body' => $body]);
            $payment = json_decode($payment->getBody(), true);

            $transacao->mp_pix_id = $payment['id'];
            $transacao->save();

            return response()->json([
                'id' => $payment['id'],
                'qrcode' => 'data:image/jpeg;base64,' . $payment['point_of_interaction']['transaction_data']['qr_code_base64'],
                'code_pix' => $payment['point_of_interaction']['transaction_data']['qr_code'],
                'transacao_id' => $transacao->id,
            ]);
        } catch (QueryException $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error($e->getMessage());
        } catch (RequestException $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error($e->getMessage());
        } catch (Exception $e) {
            echo $e->getMessage() . PHP_EOL;
            Log::error($e->getMessage());
        }
    }

    public function verificarPix(Request $request)
    {
        $regras = [
            'id' => 'required',
        ];

        $mensagens = [
            'id.required' => 'O campo id é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $transacao = Transacoes::select('id', 'pago')
            ->find($request->id);

        return response()->json([
            'id' => $transacao->id,
            'pago' => $transacao->pago,
            'user' => auth('api')->user()
        ]);
    }

    public function notificacaoPix(Request $request)
    {
        $id = $request->id;
        $topic = $request->topic;

        try {

            if ($topic === 'payment') :

                $config = Config::first();

                $headers = [
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer $config->mp_access_token"
                ];

                $client = new Client();
                $payment = $client->get("https://api.mercadopago.com/v1/payments/$id", ['timeout' => 60, 'headers' => $headers]);
                $payment = json_decode($payment->getBody(), true);

                if ($payment['status'] === 'approved') :

                    DB::transaction(function () use ($payment) {

                        $transacao = Transacoes::where('mp_pix_id', $payment['id'])
                            ->first();

                        $user = Usuarios::find($transacao->usuarios_id);
                        $user->plano = $payment['external_reference'];
                        $user->save();

                        Transacoes::where('mp_pix_id', $payment['id'])
                            ->update([
                                'pago' => 'Sim',
                                'pix_pago_em' => date('Y-m-d H:i:s', strtotime($payment['date_created'])),
                            ]);
                    }, 3);

                endif;

            endif;

            return 'ok';
        } catch (Exception $e) {
            Log::error('PIX: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
