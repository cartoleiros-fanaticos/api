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
        Schema::create('destaques', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->string('rodada');
            $table->string('apelido');
            $table->string('posicao');
            $table->string('foto');
            $table->integer('escalacoes');
            
            $table->integer('atleta_id')->unsigned();

            $table->enum('tipo', [ 'Seleção', 'Reservas', 'Capitães' ]);

            $table->unique(['atleta_id', 'rodada', 'tipo']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destaques');
    }
};
