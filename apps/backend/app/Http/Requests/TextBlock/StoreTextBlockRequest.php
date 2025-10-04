<?php

namespace App\Http\Requests\TextBlock;

use Illuminate\Foundation\Http\FormRequest;

class StoreTextBlockRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'section_id' => 'required|exists:sections,id',
        'position' => 'required|integer',
        'heading' => 'nullable|string',
        'text' => 'required|string',
        'source' => 'nullable|string',
    ]; }
}
