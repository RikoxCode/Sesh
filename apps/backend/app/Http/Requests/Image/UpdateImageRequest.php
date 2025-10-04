<?php

namespace App\Http\Requests\Image;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImageRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'sometimes|exists:sections,id',
        'position' => 'sometimes|integer',
        'image_data' => 'sometimes|string',
        'description' => 'nullable|string',
        'source' => 'nullable|string',
    ]; }
}
