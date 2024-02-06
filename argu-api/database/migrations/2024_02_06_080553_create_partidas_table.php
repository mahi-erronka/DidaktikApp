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
        Schema::create('partidas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('erabiltzailea_id');
            $table->integer('puntuazioa');
            $table->timestamps();
            
            $table->foreign('erabiltzailea_id')->references('id')->on('erabiltzaileas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
