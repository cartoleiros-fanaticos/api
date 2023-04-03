<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partidas', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->integer('partida_id')->unique();
            $table->integer('rodada');
            $table->integer('clube_casa_id');
            $table->integer('clube_casa_posicao');
            $table->integer('clube_visitante_id');
            $table->integer('clube_visitante_posicao');
            $table->datetime('partida_data');
            $table->string('local');

            $table->string('aproveitamento_casa_0')->nullable();
            $table->string('aproveitamento_casa_1')->nullable();
            $table->string('aproveitamento_casa_2')->nullable();
            $table->string('aproveitamento_casa_3')->nullable();
            $table->string('aproveitamento_casa_4')->nullable();

            $table->string('aproveitamento_fora_0')->nullable();
            $table->string('aproveitamento_fora_1')->nullable();
            $table->string('aproveitamento_fora_2')->nullable();
            $table->string('aproveitamento_fora_3')->nullable();
            $table->string('aproveitamento_fora_4')->nullable();

            $table->boolean('valida')->nullable();
            $table->integer('placar_oficial_mandante')->default(0);
            $table->integer('placar_oficial_visitante')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
