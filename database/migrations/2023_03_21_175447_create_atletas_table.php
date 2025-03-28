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
        Schema::create('atletas', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->integer('atleta_id')->unsigned();
            $table->string('nome');
            $table->string('slug');
            $table->string('apelido');
            $table->text('foto');

            $table->integer('rodada_id');

            $table->unsignedBigInteger('clube_id'); 
            $table->foreign('clube_id')->references('clube_id')->on('clubes');

            $table->unsignedBigInteger('posicao_id'); 
            $table->foreign('posicao_id')->references('posicao_id')->on('posicoes');

            $table->unsignedBigInteger('status_id'); 
            $table->foreign('status_id')->references('status_id')->on('statuses');

            $table->float('pontos_num');
            $table->float('preco_num');
            $table->float('variacao_num');
            $table->float('media_num');
            $table->float('jogos_num');
            $table->float('minimo_para_valorizar')->default(0);
            $table->enum('fora_do_cartola', ['Sim', 'Não'])->default('Não');
            $table->string('observacao', 500)->default('O atleta ainda não tem estatística.');

            $table->integer('DS')->default(0);
            $table->integer('FC')->default(0);
            $table->integer('GC')->default(0);
            $table->integer('CA')->default(0);
            $table->integer('CV')->default(0);
            $table->integer('SG')->default(0);
            $table->integer('DP')->default(0);
            $table->integer('GS')->default(0);

            $table->integer('FS')->default(0);
            $table->integer('A')->default(0);
            $table->integer('FT')->default(0);
            $table->integer('FD')->default(0);
            $table->integer('FF')->default(0);
            $table->integer('G')->default(0);
            $table->integer('I')->default(0);
            $table->integer('PP')->default(0);

            $table->integer('PS')->default(0);
            $table->integer('PC')->default(0);
            $table->integer('DE')->default(0);
            $table->integer('V')->default(0);

            $table->timestamps();

            $table->unique([ 'temporada', 'atleta_id' ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atletas');
    }
};
