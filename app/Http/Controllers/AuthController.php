<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\RecuperarSenha;
use Validator;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $regras = [
            'email' => 'required',
            'password' => 'required',
        ];

        $mensagens = [
            'email.required' => 'O campo email é obrigatório.',
            'password.required' => 'O campo password é obrigatório.',
        ];

        $validator = Validator::make($request->all(), $regras, $mensagens);

        if ($validator->fails())
            return response()->json(['message' => $validator->errors()->first()], 400);

        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Usuário ou senha não correspondem.'], 401);
        }

        return response()->json([
            'auth' => $this->respondWithToken($token)->original,
            'user' => auth('api')->user(),
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Logout realizado com sucesso.'], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            return $this->respondWithToken(auth('api')->setTTL(336)->refresh());
        } catch (\Exception $e) {
            return response()->json(['message' => 'Seu token não está autorizado.'], 401);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function recuperar_senha(Request $request)
    {

        if ($request->recovery) :

            $regras = [
                'password' => 'min:6|regex:/^(?=.*[a-zA-Z])(?=.*[0-9])/',
                'password_confirm' => 'required|same:password',
            ];

            $mensagens = [
                'password.regex' => 'O campo senha precisa ter letras e números.',
                'password.min' => 'O campo senha precisa ter no minimo 6 digitos.',
                'password_confirm.required' => 'O campo confirmar senha é obrigatório.',
                'password_confirm.same' => 'O campo senha não bate com a confirmação, ambos precisam ser igual.',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails())
                return response()->json(['message' => $validator->errors()->first()], 400);

            $password = Hash::make($request->password);

            $usuario = Usuarios::where('recovery', $request->recovery)
                ->first();

            if (!$usuario)
                return response()->json(['message' => 'Dados não correspondem ao usuário, tente novamente.'], 400);

            Usuarios::where('recovery', $request->recovery)
                ->update([
                    'password' => $password,
                    'recovery' => null
                ]);

            $access_token = auth('api')->login($usuario);

            $response = [
                'auth' => ['access_token' => $access_token],
                'user' => $usuario
            ];

        else :

            $regras = [
                'email' => 'required|regex:/^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i',
            ];

            $mensagens = [
                'email.required' => 'O campo email é obrigatório.',
                'email.regex' => 'Email não é valido.',
            ];

            $validator = Validator::make($request->all(), $regras, $mensagens);

            if ($validator->fails())
                return response()->json(['message' => $validator->errors()->first()], 400);

            $usuario = Usuarios::where('email', $request->email)->first();

            if (is_null($usuario))
                return response()->json(['message' => 'Email informado não foi encontrado.'], 400);

            $usuario->recovery = str_replace('/', '', Hash::make(Str::random(20)));
            $usuario->save();

            $response = Mail::to($usuario->email)->send(new RecuperarSenha($usuario->recovery));

        endif;

        return response()->json($response);
    }
}
