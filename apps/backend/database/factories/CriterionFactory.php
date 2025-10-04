<?php

namespace Database\Factories;

use App\Models\Criterion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Criterion>
 */
class CriterionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Criterion::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'year_id' => \App\Models\Year::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'special_for_project_id' => null,
        ];
    }
}
