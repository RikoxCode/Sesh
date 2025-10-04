<?php

namespace App\Http\Requests\Table;

use Illuminate\Foundation\Http\FormRequest;

class StoreTableRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'required|exists:sections,id',
        'position' => 'required|integer',
        'heading' => 'nullable|string',
        'markdown_table' => 'required|string',
        'source' => 'nullable|string',
    ]; }
}
