<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ai_ratings', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('section_id', 36);
            $table->integer('rating');
            $table->string('rating_description');
            $table->string('rating_checksum');
            $table->timestamps();

            $table->foreign('section_id')->references('id')->on('sections');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_ratings');
    }
};
