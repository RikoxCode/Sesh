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
        Schema::create('time_blocks', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('project_id', 36);
            $table->string('description');
            $table->boolean('is_chore');
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->timestamps();

            $table->foreign('project_id')->references('id')->on('projects');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_blocks');
    }
};
