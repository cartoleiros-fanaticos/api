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
        Schema::create('scouts', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->string('nome');
            $table->string('sigla');
            $table->double('valor');
            $table->enum('tipo', ['Positivo', 'Negativo']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scouts');
    }
};
