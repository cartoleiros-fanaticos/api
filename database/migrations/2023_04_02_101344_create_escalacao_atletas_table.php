<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('escalacao_atletas', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->integer('atleta_id');
            $table->float('preco_num');
            $table->integer('rodada_time_id');
            $table->enum('titular', ['Sim', 'Não'])->default('Sim');
            $table->enum('entrou_em_campo', [ 'Sim', 'Não' ])->default('Sim');

            $table->foreignId('escalacao_rodadas_id')
                ->constrained('escalacao_rodadas')
                ->onDelete('cascade');

            $table->timestamps();
        });

        DB::statement('ALTER TABLE `escalacao_atletas` ADD UNIQUE `rodada_time_id_atleta_id_escalacao_rodadas_id_unique`(`rodada_time_id`, `atleta_id`, `escalacao_rodadas_id`)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escalacao_atletas');
    }
};
