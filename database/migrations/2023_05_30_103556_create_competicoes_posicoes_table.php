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
        Schema::create('competicoes_posicoes', function (Blueprint $table) {
            $table->id();
            $table->integer('posicao');
            $table->float('percentual');
            $table->float('pontos')->default(0);

            $table->foreignId('competicoes_id')
                ->constrained('competicoes')
                ->onDelete('cascade');

            $table->foreignId('competicoes_times_id')
                ->nullable()
                ->onDelete('cascade')
                ->constrained('competicoes_times');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competicoes_posicoes');
    }
};
