<?php

namespace App\Http\Requests\Chapter;

use Illuminate\Foundation\Http\FormRequest;

class UpdateChapterRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'project_id' => 'sometimes|exists:projects,id',
        'type' => 'sometimes|string',
        'title' => 'sometimes|string|max:255',
        'subtitle' => 'nullable|string|max:255',
    ]; }
}
