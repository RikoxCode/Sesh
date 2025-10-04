<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

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
            'image_data' => $this->faker->imageUrl(640, 480),
            'description' => $this->faker->sentence(),
            'source' => $this->faker->url(),
        ];
    }
}
