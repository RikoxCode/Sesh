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
        Schema::create('criteria', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('year_id', 36);
            $table->string('title');
            $table->text('description');
            $table->char('special_for_project_id', 36)->nullable();
            $table->timestamps();

            $table->foreign('year_id')->references('id')->on('years');
            $table->foreign('special_for_project_id')->references('id')->on('projects');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criteria');
    }
};
