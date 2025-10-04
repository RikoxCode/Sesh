<?php

namespace App\Http\Requests\Image;

use Illuminate\Foundation\Http\FormRequest;

class StoreImageRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'required|exists:sections,id',
        'position' => 'required|integer',
        'image_data' => 'required|string',
        'description' => 'nullable|string',
        'source' => 'nullable|string',
    ]; }
}
