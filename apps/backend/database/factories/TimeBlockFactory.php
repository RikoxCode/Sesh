<?php

namespace Database\Factories;

use App\Models\TimeBlock;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimeBlock>
 */
class TimeBlockFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TimeBlock::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = $this->faker->dateTimeThisYear();
        $endTime = (clone $startTime)->modify('+' . $this->faker->numberBetween(1, 8) . ' hours');

        return [
            'project_id' => Project::factory(),
            'description' => $this->faker->sentence(),
            'is_chore' => $this->faker->boolean(),
            'start_time' => $startTime,
            'end_time' => $endTime,
        ];
    }
}
