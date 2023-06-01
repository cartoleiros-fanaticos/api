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
            $table->string('descricao');
            $table->enum('tipo', ['rodada', 'mensal', 'turno', 'anual'])->default('rodada');
            $table->float('comissao')->default(0);
            $table->float('valor');
            $table->integer('num_posicoes')->default(1);
            $table->integer('de');
            $table->integer('ate');
            $table->enum('ativo', ['Sim', 'Não']);
            $table->enum('situacao', ['Aguardando', 'Em andamento', 'Encerrada'])->default('Aguardando');
            $table->enum('capitao', ['Sim', 'Não'])->default('Sim');

            $table->enum('provedor', ['MERCADO PAGO'])->default('MERCADO PAGO');

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
