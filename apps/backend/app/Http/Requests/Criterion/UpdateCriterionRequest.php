<?php

namespace App\Http\Requests\Criterion;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCriterionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'year_id' => 'sometimes|exists:years,id',
        'title' => 'sometimes|string',
        'description' => 'nullable|string',
        'special_for_project_id' => 'nullable|exists:projects,id',
    ]; }
}
