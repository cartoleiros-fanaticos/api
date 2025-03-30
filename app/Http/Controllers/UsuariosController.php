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

        $auth = auth('api')->user();

        $usuarios = Usuarios::where(function ($q) use ($request) {

            if ($request->pesquisar) :

                $q->where('nome', 'LIKE', '%' . $request->pesquisar . '%')
                    ->orWhere('email', 'LIKE', '%' . $request->pesquisar . '%');

            endif;
        })
            ->paginate(100);

        return response()->json([
            'auth' => $auth,
            'usuarios' => $usuarios
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if ($request->exists('id')) :

            $regras = [
                'nome' => 'required',
                'email' => 'required|regex:/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i',
                'celular' => 'required|regex:/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/',
            ];

            $mensagens = [
                'nome.required' => 'O campo nome é obrigatório.',
                'celular.required' => 'O campo Whats App é obrigatório.',
                'celular.regex' => 'O formato do Whats App não é valido Ex.: (99) 99999-9999.',
                'email.required' => 'O campo email é obrigatório.',
                'email.regex' => 'Email não é valido.',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails())
                return response()->json(['message' => $validator->errors()->first()], 400);

            $user = auth('api')->user();

            if ($user->funcao != 'Admin') :
                if (
                    $user->funcao != $request->funcao or
                    $user->plano != $request->plano or
                    $user->ativo != $request->ativo or
                    $user->comissao != $request->comissao
                ) :
                    return response()->json(['message' => 'Você não tem permissão para alterar esses dados.'], 401);
                endif;
            endif;

            $usuario = Usuarios::find($request->id);

            $usuario->nome = $request->nome;
            $usuario->celular = preg_replace('/[-() ]/', '', $request->celular);
            #$usuario->email = $request->email;
            $usuario->comissao = $request->comissao == 'null' ? 0 : $request->comissao;
            $usuario->plano = $request->plano;
            $usuario->funcao = $request->funcao;
            $usuario->ativo = $request->ativo;

            if ($request->password)
                $usuario->password = Hash::make($request->password);

            if ($request->hasFile('foto')) :
                $foto = md5(date('Y-m-d H:i:s'));
                $usuario->foto = "$foto.jpg";
                $request->foto->storeAs('images', "$foto.jpg");
            endif;

            $response = $usuario->save();

            return response()->json($response);

        else :

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
                'auth' => ['access_token' => $access_token],
                'user' => $usuario
            ]);

        endif;
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
        $user = auth('api')->user();

        if ($user->funcao != 'Admin')
            return response()->json(['message' => 'Apenas administradores podem fazer essa operação.'], 401);

        $response = Usuarios::destroy($id);
        return response()->json($response);
    }
}
