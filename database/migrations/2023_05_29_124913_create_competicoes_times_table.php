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
        Schema::create('competicoes_times', function (Blueprint $table) {
            $table->id();

            $table->foreignId('times_cartolas_id')
                ->constrained('times_cartolas')
                ->onDelete('cascade');

            $table->foreignId('usuarios_id')
                ->constrained('usuarios')
                ->onDelete('cascade');

            $table->unique(['times_cartolas_id', 'usuarios_id']);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competicoes_times');
    }
};
