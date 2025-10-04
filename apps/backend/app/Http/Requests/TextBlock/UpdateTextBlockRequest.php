<?php

namespace App\Http\Requests\TextBlock;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTextBlockRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'sometimes|exists:sections,id',
        'position' => 'sometimes|integer',
        'heading' => 'nullable|string',
        'text' => 'sometimes|string',
        'source' => 'nullable|string',
    ]; }
}
