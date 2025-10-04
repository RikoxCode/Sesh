<?php

namespace App\Http\Requests\Section;

use Illuminate\Foundation\Http\FormRequest;

class StoreSectionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'chapter_id' => 'required|exists:chapters,id',
        'parent_id' => 'nullable|exists:sections,id',
        'position' => 'required|integer',
        'title' => 'required|string',
        'subtitle' => 'nullable|string',
        'rating_checksum' => 'nullable|string',
    ]; }
}
