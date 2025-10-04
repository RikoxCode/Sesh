<?php

namespace App\Http\Requests\Table;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTableRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'sometimes|exists:sections,id',
        'position' => 'sometimes|integer',
        'heading' => 'nullable|string',
        'markdown_table' => 'sometimes|string',
        'source' => 'nullable|string',
    ]; }
}
