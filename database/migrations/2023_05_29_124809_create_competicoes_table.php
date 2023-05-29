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
        Schema::create('competicoes', function (Blueprint $table) {
            $table->id();

            $table->string('nome');
            $table->string('descrição');
            $table->float('valor');
            $table->float('comissao');
            $table->enum('tipo', ['rodada', 'mensal', 'turno', 'anual']);
            $table->enum('situacao', ['Aguardando', 'Em andamento', 'Encerrada'])->default('Aguardando');
            $table->enum('ativo', ['Sim', 'Não']);

            $table->enum('provedor', ['MERCADO PAGO']);

            $table->integer('de');
            $table->integer('ate');

            $table->foreignId('usuarios_id')
                ->constrained('usuarios')
                ->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competicoes');
    }
};
