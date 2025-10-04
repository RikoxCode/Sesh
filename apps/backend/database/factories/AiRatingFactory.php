<?php

namespace Database\Factories;

use App\Models\AiRating;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AiRating>
 */
class AiRatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AiRating::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'section_id' => Section::factory(),
            'rating' => $this->faker->numberBetween(1, 10),
            'rating_description' => $this->faker->paragraph(),
            'rating_checksum' => $this->faker->sha256(),
        ];
    }
}
