<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\Models\Usuarios;

class UsuariosController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['index', 'store']]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $regras = [
            'email' => 'required'
        ];

        $mensagens = [
            'email.required' => 'O campo email é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $email = $request->input('email');

        $email = explode(',', $email);

        $plano = $request->input('plano', 'Plano Fanático');

        $response = Usuarios::whereIn('email', $email)->update([
            'plano' => $plano
        ]);

        return $response;

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $regras = [
            'nome' => 'required',
            'email' => 'required|unique:usuarios|regex:/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i',
            'celular' => 'required|regex:/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/',
            'password' => 'min:6|regex:/^(?=.*[a-zA-Z])(?=.*[0-9])/',
            'password_confirm' => 'required|same:password',
        ];

        $mensagens = [
            'nome.required' => 'O campo nome é obrigatório.',
            'celular.required' => 'O campo Whats App é obrigatório.',
            'celular.regex' => 'O formato do Whats App não é valido Ex.: (99) 99999-9999.',
            'email.required' => 'O campo email é obrigatório.',
            'email.unique' => 'Email já existe em nosso banco.',
            'email.regex' => 'Email não é valido.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.regex' => 'O campo senha precisa ter letras e números.',
            'password.min' => 'O campo senha precisa ter no minimo 6 digitos.',
            'password_confirm.required' => 'O campo confirmar senha é obrigatório.',
            'password_confirm.same' => 'O campo senha não bate com a confirmação, ambos precisam ser igual.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $usuario = new Usuarios;

        $usuario->nome = $request->nome;
        $usuario->celular = preg_replace('/[-() ]/', '', $request->celular);
        $usuario->email = $request->email;
        $usuario->plano = 'Demonstrativo';
        $usuario->funcao = 'Cartoleiro';
        $usuario->ativo = 'Sim';
        $usuario->password = Hash::make($request->password);

        $usuario->save();        

        $access_token = auth('api')->login($usuario);

        return response()->json([
            'auth' => [ 'access_token' => $access_token ],
            'user' => $usuario
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
