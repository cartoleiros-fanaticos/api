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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('celular');
            $table->float('comissao')->nullable();
            $table->string('token_payment')->nullable();
            $table->string('foto')->nullable();
            $table->string('email')->unique();
            $table->string('recovery')->nullable();
            $table->string('password');
            $table->enum('funcao', ['Admin', 'Funcionario', 'Dono de Liga', 'Cartoleiro'])->default('Cartoleiro');
            $table->enum('plano', ['Demonstrativo', 'Free Cartoleiro', 'Plano Stats', 'Plano Fanático'])->default('Demonstrativo');
            $table->enum('ativo', ['Sim', 'Não'])->default('Sim');
            $table->string('token_payment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
