<?php

namespace Database\Factories;

use App\Models\UserSubCriterion;
use App\Models\SubCriterion;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserSubCriterion>
 */
class UserSubCriterionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserSubCriterion::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sub_criteria_id' => SubCriterion::factory(),
            'user_id' => User::factory(),
            'is_fulfilled' => $this->faker->boolean(),
        ];
    }
}
