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
        Schema::create('posicoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('posicoes_id');
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->string('nome');
            $table->string('abreviacao');
            $table->timestamps();

            $table->unique(['posicoes_id', 'temporada']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posicoes');
    }
};
