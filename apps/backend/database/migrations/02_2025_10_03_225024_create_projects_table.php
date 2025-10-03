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
        Schema::create('projects', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('year_id', 36);
            $table->char('owner_id', 36);
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('description');
            $table->timestamps();

            $table->foreign('year_id')->references('id')->on('years');
            $table->foreign('owner_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
