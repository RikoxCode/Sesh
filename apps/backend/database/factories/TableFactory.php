<?php

namespace Database\Factories;

use App\Models\Table;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Table::class;

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
            'markdown_table' =>
                '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
            'source' => $this->faker->url(),
        ];
    }
}
