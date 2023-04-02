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
        Schema::create('escalacao_rodadas', function (Blueprint $table) {
            $table->id();

            $table->integer('rodada_time_id');
            $table->integer('capitao_id')->nullable();
            $table->enum('esquema', ['3-4-3', '3-5-2', '4-3-3', '4-4-2', '4-5-1', '5-3-2', '5-4-1']);
            $table->float('valor_time');
            $table->float('pontuacao')->default(0);

            $table->foreignId('escalacao_times_id')
                ->constrained('escalacao_times')
                ->onDelete('cascade');

            $table->unique(['rodada_time_id', 'escalacao_times_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escalacao_rodadas');
    }
};
