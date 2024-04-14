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
        Schema::create('competicoes_transacoes', function (Blueprint $table) {
            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));

            $table->enum('situacao', ['Pendente', 'Aceita', 'Rejeitada'])->default('Pendente');

            $table->foreignId('competicoes_id')
                ->constrained('competicoes')
                ->onDelete('cascade');

            $table->foreignId('competicoes_times_id')
                ->constrained('competicoes_times')
                ->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });

        DB::statement('ALTER TABLE `competicoes_transacoes` ADD UNIQUE `competicoes_id_competicoes_times_id_unique`(`competicoes_id`, `competicoes_times_id`)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competicoes_transacoes');
    }
};
