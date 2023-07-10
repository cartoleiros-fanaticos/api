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
        Schema::create('competicoes_atletas', function (Blueprint $table) {
            $table->id();
            
            $table->integer('rodada');            
            $table->integer('atleta_id');

            $table->foreignId('competicoes_times_id')
                ->constrained('competicoes_times')
                ->onDelete('cascade');

            $table->unique(['rodada', 'atleta_id', 'competicoes_times_id']);

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competicoes_atletas');
    }
};
