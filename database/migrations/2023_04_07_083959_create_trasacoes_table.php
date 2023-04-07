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
        Schema::create('trasacoes', function (Blueprint $table) {

            $table->id();
            $table->string('temporada')->default(Carbon::now()->format('Y'));

            $table->float('valor');
            $table->float('comissao')->default(0);

            $table->enum('operacao', ['Devolução', 'Bônus', 'Depósito', 'Depósito manual', 'Saque', 'Saque pago', 'Saque falhou', 'Palpite', 'Prêmio' ]);            
            $table->enum('pago', ['Sim', 'Não'])->nullable();

            $table->string('observacao')->nullable();

            $table->string('mp_pix_id')->nullable();
            $table->datetime('pix_pago_em')->nullable();

            $table->foreignId('usuarios_id')
                ->constrained('usuarios')
                ->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trasacoes');
    }
};
