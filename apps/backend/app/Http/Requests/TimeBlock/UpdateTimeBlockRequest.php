<?php

namespace App\Http\Requests\TimeBlock;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTimeBlockRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'project_id' => 'sometimes|exists:projects,id',
        'description' => 'sometimes|string',
        'is_chore' => 'sometimes|boolean',
        'start_time' => 'sometimes|date',
        'end_time' => 'sometimes|date|after_or_equal:start_time',
    ]; }
}
