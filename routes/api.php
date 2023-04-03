<?php

use App\Http\Controllers\AtletasController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContatoController;
use App\Http\Controllers\CruzamentoController;
use App\Http\Controllers\EscalacaoController;
use App\Http\Controllers\ParciaisController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\VideosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('recuperar-senha', [AuthController::class, 'recuperar_senha']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

    Route::resource('usuarios', UsuariosController::class);
    Route::resource('cruzamento', CruzamentoController::class);
    Route::post('enviar-email/contato', [ContatoController::class, 'enviar_email']);

    Route::resource('escalacao', EscalacaoController::class);
    Route::resource('atletas', AtletasController::class);

    Route::get('parciais/atletas', [ParciaisController::class, 'parciais_atletas']);
    Route::get('parciais/rodadas', [ParciaisController::class, 'parciais_rodadas']);

    Route::get('compare/atletas', [AtletasController::class, 'compare']);
    Route::get('pontos-cedidos/atletas', [AtletasController::class, 'pontos_cedidos']);
    Route::get('destaques/atletas', [AtletasController::class, 'destaques']);

    Route::resource('videos', VideosController::class);
});
