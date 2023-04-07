<?php

namespace App\Http\Controllers;

use App\Models\Config;
use App\Models\Planos;
use App\Models\Trasacoes;
use Illuminate\Http\Request;

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

        $transacao = new Trasacoes();
        $transacao->valor = $plano->valor;
        $transacao->operacao = 'Depósito';
        $transacao->pago = 'Não';
        $transacao->comissao = $user->comissao_admin / 100 * (float) $plano->valor;
        $transacao->usuarios_id = $user->id;
        $response = $transacao->save();

        // MercadoPago\SDK::setAccessToken($mp_access_token);

        // try {

        //     $config = new ConfigController;
        //     $payment = $config->cobranca_pix($response['valor'], 'Pix de crédito na plataforma, efetuado pelo cliente ' . $response['nome'] . '.', $mp_access_token, $usuarios_id, null, $response['email']);

        //     $creditos = CreditosTransacao::find($response['transacao']);
        //     $creditos->mp_pix_id = $payment->id;
        //     $creditos->save();

        //     return [
        //         'qrcode' => 'data:image/jpeg;base64,' . $payment->point_of_interaction->transaction_data->qr_code_base64,
        //         'code_pix' => $payment->point_of_interaction->transaction_data->qr_code,
        //         'email' => $response['email'],
        //         'transacao' => $response['transacao'],
        //     ];

        // } catch (Exception $e) {
        //     return response()->json(['message' => $e->getMessage()], 400);
        // }

        return response()->json($response);
    }
}
