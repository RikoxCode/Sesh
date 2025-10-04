<?php

namespace App\Http\Requests\Section;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSectionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'chapter_id' => 'sometimes|exists:chapters,id',
        'parent_id' => 'nullable|exists:sections,id',
        'position' => 'sometimes|integer',
        'title' => 'sometimes|string',
        'subtitle' => 'nullable|string',
        'rating_checksum' => 'nullable|string',
    ]; }
}
