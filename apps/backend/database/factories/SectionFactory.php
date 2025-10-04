<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\Chapter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
class SectionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Section::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'chapter_id' => Chapter::factory(),
            'parent_id' => null,
            'position' => $this->faker->numberBetween(1, 10),
            'title' => $this->faker->sentence(3),
            'subtitle' => $this->faker->sentence(5),
            'rating_checksum' => $this->faker->sha256(),
        ];
    }
}
