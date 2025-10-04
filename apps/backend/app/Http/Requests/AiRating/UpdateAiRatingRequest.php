<?php

namespace App\Http\Requests\AiRating;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAiRatingRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'sometimes|exists:sections,id',
        'rating' => 'sometimes|integer|min:1|max:6',
        'rating_description' => 'nullable|string',
        'rating_checksum' => 'nullable|string',
    ]; }
}
