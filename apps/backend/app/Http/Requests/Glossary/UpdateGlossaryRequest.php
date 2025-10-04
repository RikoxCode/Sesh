<?php

namespace App\Http\Requests\Glossary;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGlossaryRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'project_id' => 'sometimes|exists:projects,id',
        'term' => 'sometimes|string',
        'definition' => 'sometimes|string',
    ]; }
}
