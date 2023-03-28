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
        Schema::create('destaques', function (Blueprint $table) {
            $table->id();

            $table->foreignId('clube_id')->constrained('clubes');
            $table->foreignId('atleta_id')->constrained('atletas');
            $table->integer('escalacoes');
            $table->enum('tipo', [ 'Atleta', 'Capitão' ]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destaques');
    }
};
