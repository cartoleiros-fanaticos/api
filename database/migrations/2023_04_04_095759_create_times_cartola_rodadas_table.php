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
        Schema::create('times_cartola_rodadas', function (Blueprint $table) {
            $table->id();

            $table->integer('rodada_time_id');
            $table->integer('capitao_id')->nullable();
            $table->integer('esquema_id');
            $table->float('valor_time');
            $table->float('pontos')->default(0);
            $table->float('pontos_sem_capitao')->default(0);

            $table->foreignId('times_cartolas_id')
                ->constrained('times_cartolas')
                ->onDelete('cascade');

            $table->unique(['rodada_time_id', 'times_cartolas_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('times_cartola_rodadas');
    }
};
