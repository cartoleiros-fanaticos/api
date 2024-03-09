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
        Schema::create('parciais', function (Blueprint $table) {

            $table->id();    
            $table->string('temporada')->default(Carbon::now()->format('Y'));        

            $table->integer('rodada');
            $table->integer('atleta_id');

            $table->foreignId('clube_id')->constrained('clubes');
            $table->foreignId('posicao_id')->constrained('posicoes');
            
            $table->float('pontuacao');
            $table->float('variacao_num')->default(0);
            $table->enum('entrou_em_campo', [ 'Sim', 'Não' ])->default('Sim');

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

            $table->unique([ 'rodada', 'atleta_id' ]);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parciais');
    }
};
