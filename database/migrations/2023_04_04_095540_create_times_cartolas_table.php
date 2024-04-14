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
        Schema::create('times_cartolas', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->integer('time_id')->unsigned();
            $table->string('nome');
            $table->string('nome_cartola');
            $table->string('slug');
            $table->string('url_escudo_png');
            $table->float('pontos_campeonato')->default(0);
            $table->bigInteger('facebook_id')->nullable();
            $table->string('foto_perfil')->nullable();
            $table->float('patrimonio');
            $table->boolean('assinante');
            $table->timestamps();

            $table->unique([ 'temporada', 'time_id' ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('times_cartolas');
    }
};
