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
        Schema::create('escalacao_times', function (Blueprint $table) {
            $table->id();     
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->string('nome');
            $table->string('slug');
            $table->float('patrimonio');
            $table->float('pontos_campeonato')->default(0);
            $table->integer('time_id')->unique();
            $table->string('url_escudo_png');
            $table->boolean('assinante')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escalacao_times');
    }
};
