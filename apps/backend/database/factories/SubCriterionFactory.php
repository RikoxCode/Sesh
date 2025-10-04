<?php

namespace Database\Factories;

use App\Models\SubCriterion;
use App\Models\Criterion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubCriterion>
 */
class SubCriterionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SubCriterion::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'criteria_id' => Criterion::factory(),
            'description' => $this->faker->paragraph(),
        ];
    }
}
