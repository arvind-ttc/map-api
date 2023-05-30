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
        // Schema::create('polygons', function (Blueprint $table) {
        //     $table->string('info')->default("sample");
        //     $table->json('polygon')->default('{"foo": "bar"}');
        // });

        Schema::create('polygons', function (Blueprint $table) {
            $table->id();
            $table->string('info');
            $table->text('data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('polygons');
    }
};