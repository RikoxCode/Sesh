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
        Schema::create('sub_criteria', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('criteria_id', 36);
            $table->text('description');
            $table->timestamps();

            $table->foreign('criteria_id')->references('id')->on('criteria');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_criteria');
    }
};
