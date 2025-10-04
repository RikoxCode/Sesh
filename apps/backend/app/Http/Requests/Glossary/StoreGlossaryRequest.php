<?php

namespace App\Http\Requests\Glossary;

use Illuminate\Foundation\Http\FormRequest;

class StoreGlossaryRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'project_id' => 'required|exists:projects,id',
        'term' => 'required|string',
        'definition' => 'required|string',
    ]; }
}
