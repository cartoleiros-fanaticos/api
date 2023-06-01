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
        Schema::create('competicoes_transacoes', function (Blueprint $table) {
            $table->id();

            $table->enum('situacao', ['Pendente', 'Aceita', 'Rejeitada'])->default('Pendente');

            $table->foreignId('competicoes_id')
                ->constrained('competicoes')
                ->onDelete('cascade');

            $table->foreignId('competicoes_times_id')
                ->constrained('competicoes_times')
                ->onDelete('cascade');

            $table->unique(['situacao', 'competicoes_times_id']);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competicoes_transacoes');
    }
};
