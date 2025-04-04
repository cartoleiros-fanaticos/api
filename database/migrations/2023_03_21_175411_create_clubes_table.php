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
        Schema::create('clubes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('clube_id');
            $table->string('temporada')->default(Carbon::now()->format('Y'));
            $table->string('nome');
            $table->string('abreviacao');
            $table->text('escudo');
            $table->string('60x60');
            $table->string('45x45');
            $table->string('30x30');
            $table->timestamps();

            $table->unique(['clube_id', 'temporada']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubes');
    }
};
