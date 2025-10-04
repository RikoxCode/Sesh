<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Chapter::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'type' => $this->faker->randomElement(['introduction', 'main', 'conclusion']),
            'title' => $this->faker->sentence(3),
            'subtitle' => $this->faker->sentence(5),
        ];
    }
}
