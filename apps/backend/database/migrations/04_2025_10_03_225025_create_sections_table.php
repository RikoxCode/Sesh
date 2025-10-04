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
        Schema::create('sections', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('chapter_id', 36);
            $table->char('parent_id', 36)->nullable();
            $table->integer('position');
            $table->string('title');
            $table->text('subtitle');
            $table->string('rating_checksum');
            $table->timestamps();

            $table->foreign('chapter_id')->references('id')->on('chapters');
            $table->foreign('parent_id')->references('id')->on('sections');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sections');
    }
};
