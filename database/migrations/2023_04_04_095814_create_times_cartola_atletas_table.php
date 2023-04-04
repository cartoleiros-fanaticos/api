<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('times_cartola_atletas', function (Blueprint $table) {
            $table->id();

            $table->integer('atleta_id');
            $table->string('apelido');
            $table->string('foto');
            $table->float('pontos_num');
            $table->float('preco_num');
            $table->float('variacao_num');
            $table->float('media_num');
            $table->integer('jogos_num');
            $table->integer('posicao_id');       
            
            $table->enum('titular', ['Sim', 'Não'])->default('Sim');

            $table->integer('rodada_time_id');

            $table->foreignId('times_cartola_rodadas_id')
                ->constrained('times_cartola_rodadas')
                ->onDelete('cascade');

            $table->timestamps();
        });

        DB::statement('ALTER TABLE `times_cartola_atletas` ADD UNIQUE `rodada_time_id_atleta_id_times_cartola_rodadas_id_unique`(`rodada_time_id`, `atleta_id`, `times_cartola_rodadas_id`)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('times_cartola_atletas');
    }
};
