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

Route::get('atletas/{atleta_id}/{liga_id}', [AtletasController::class, 'tem_atleta']);

Route::resource('escalacao', EscalacaoController::class);
Route::resource('usuarios', UsuariosController::class);

Route::group([
    
    'middleware' => 'jwt',
    
], function ($router) {
    
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me']);
    

    Route::resource('cruzamento', CruzamentoController::class);   

    Route::post('enviar-email/contato', [ContatoController::class, 'enviar_email']);

    Route::resource('atletas', AtletasController::class);
    Route::get('compare/atletas', [AtletasController::class, 'compare']);
    Route::get('pontos-cedidos/atletas', [AtletasController::class, 'pontos_cedidos']);
    Route::get('destaques/atletas', [AtletasController::class, 'destaques']);

    Route::get('parciais/atletas', [ParciaisController::class, 'parciais_atletas']);
    Route::get('parciais/clubes/{id}', [ParciaisController::class, 'parciais_clubes']);
    Route::get('parciais/time/{id}', [ParciaisController::class, 'parciais_time']);
    Route::get('parciais/liga/{slug}', [ParciaisController::class, 'parciais_liga']);

    Route::get('parciais/partidas', [ParciaisController::class, 'partidas']);
    Route::get('parciais/ligas', [ParciaisController::class, 'ligas']);
    Route::get('parciais/times', [ParciaisController::class, 'times']);

    Route::get('parciais/time/rodada/{id}', [ParciaisController::class, 'time_rodada']);

    Route::get('planos', [PlanosController::class, 'index']);
    Route::get('cobranca-pix/{id}', [PlanosController::class, 'cobrancaPix']);
    Route::get('verificar-pix', [PlanosController::class, 'verificarPix']);

    Route::resource('videos', VideosController::class);
});
