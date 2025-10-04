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
        Schema::create('user_sub_criteria', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('sub_criteria_id', 36);
            $table->char('user_id', 36);
            $table->boolean('is_fulfilled');
            $table->timestamps();

            $table->foreign('sub_criteria_id')->references('id')->on('sub_criteria');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_sub_criteria');
    }
};
