<?php

namespace Database\Factories;

use App\Models\TextBlock;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TextBlock>
 */
class TextBlockFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TextBlock::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'section_id' => Section::factory(),
            'position' => $this->faker->numberBetween(1, 10),
            'heading' => $this->faker->sentence(3),
            'text' => $this->faker->paragraphs(3, true),
            'source' => $this->faker->url(),
        ];
    }
}
