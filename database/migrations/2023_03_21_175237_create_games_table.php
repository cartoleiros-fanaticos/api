<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->integer('temporada');
            $table->integer('rodada_atual');
            $table->integer('status_mercado');

            // 1 - Mercado Aberto
            // 2 - Parciais
            // 3 - Manutenção
            
            $table->boolean('game_over');
            $table->integer('times_escalados');
            $table->datetime('fechamento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
