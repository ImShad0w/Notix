<?php

namespace Database\Factories;

use App\Models\Note;
use Illuminate\Database\Eloquent\Factories\Factory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Note::class;
    public function definition(): array
    {
        static $noteNumber = 1;
        return [
            "note_number" => $noteNumber++,
            "name"=>$this->faker->sentence(),
            "text"=>$this->faker->paragraph(),
        ];
    }
}
