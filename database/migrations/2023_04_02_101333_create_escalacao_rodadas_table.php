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
        Schema::create('escalacao_rodadas', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->integer('rodada_time_id');
            $table->integer('capitao_id')->nullable();
            $table->integer('esquema_id');
            $table->float('valor_time');
            $table->float('pontuacao')->default(0);

            $table->foreignId('escalacao_times_id')
                ->constrained('escalacao_times')
                ->onDelete('cascade');

            $table->unique(['rodada_time_id', 'escalacao_times_id']);

            $table->timestamps();
        });

        DB::statement('ALTER TABLE `escalacao_rodadas` ADD UNIQUE `temporada_rodada_time_id_escalacao_times_id_unique`(`temporada`, `rodada_time_id`, `escalacao_times_id`)');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escalacao_rodadas');
    }
};
