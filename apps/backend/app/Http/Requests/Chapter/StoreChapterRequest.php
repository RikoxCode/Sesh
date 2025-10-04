<?php

namespace App\Http\Requests\Chapter;

use Illuminate\Foundation\Http\FormRequest;

class StoreChapterRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'project_id' => 'required|exists:projects,id',
        'position' => 'required|integer',
        'type' => 'required|string',
        'title' => 'required|string|max:255',
        'subtitle' => 'nullable|string|max:255',
    ]; }
}
