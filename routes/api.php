<?php

use App\Http\Controllers\AtletasController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContatoController;
use App\Http\Controllers\CruzamentoController;
use App\Http\Controllers\EscalacaoController;
use App\Http\Controllers\EstatisticasController;
use App\Http\Controllers\ParciaisController;
use App\Http\Controllers\PlanosController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\VideosController;
use App\Models\Planos;
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

Route::post('login', [AuthController::class, 'login']);
Route::post('recuperar-senha', [AuthController::class, 'recuperar_senha']);
Route::post('refresh', [AuthController::class, 'refresh']);
Route::post('notificacao-pix', [PlanosController::class, 'notificacaoPix']);

Route::group([

    'middleware' => 'jwt',

], function ($router) {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me']);

    Route::resource('usuarios', UsuariosController::class);
    Route::resource('cruzamento', CruzamentoController::class);
    Route::post('enviar-email/contato', [ContatoController::class, 'enviar_email']);

    Route::resource('escalacao', EscalacaoController::class);
    Route::resource('atletas', AtletasController::class);

    Route::get('parciais/atletas', [ParciaisController::class, 'parciais_atletas']);
    Route::get('parciais/rodadas', [ParciaisController::class, 'parciais_rodadas']);
    Route::get('parciais/partida', [ParciaisController::class, 'parciais_partida']);

    Route::get('planos', [PlanosController::class, 'index']);
    Route::get('cobranca-pix/{id}', [PlanosController::class, 'cobrancaPix']);
    Route::get('verificar-pix', [PlanosController::class, 'verificarPix']);

    Route::get('estatisticas/time/{id}', [EstatisticasController::class, 'time']);
    Route::get('estatisticas/times', [EstatisticasController::class, 'times']);
    Route::get('estatisticas/time-rodada/{id}', [EstatisticasController::class, 'time_rodada']);

    Route::get('compare/atletas', [AtletasController::class, 'compare']);
    Route::get('pontos-cedidos/atletas', [AtletasController::class, 'pontos_cedidos']);
    Route::get('destaques/atletas', [AtletasController::class, 'destaques']);

    Route::resource('videos', VideosController::class);
});
