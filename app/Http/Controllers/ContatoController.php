<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\Contato;
use Illuminate\Support\Facades\Mail;
use Validator;
use Illuminate\Support\Str;


class ContatoController extends Controller
{
    public function enviar_email(Request $request)
    {

        $regras = [
            'nome' => 'required',
            'assunto' => 'required',
            'email' => 'required|regex:/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i',
            'celular' => 'required|regex:/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/',
            'mensagem' => 'required',
        ];

        $mensagens = [
            'nome.required' => 'O campo nome é obrigatório.',
            'assunto.required' => 'O campo assunto é obrigatório.',
            'celular.required' => 'O campo Whats App é obrigatório.',
            'celular.regex' => 'O formato do Whats App não é valido Ex.: (99) 99999-9999.',
            'email.required' => 'O campo email é obrigatório.',
            'email.unique' => 'Email já existe em nosso banco.',
            'email.regex' => 'Email não é valido.',
            'mensagem.required' => 'O campo mensagem é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $request->image->storeAs('images', 'filename.jpg');

        $response = Mail::to($request->email)
            ->send(new Contato($request->all()));

        return response()->json($response);
    }
}
