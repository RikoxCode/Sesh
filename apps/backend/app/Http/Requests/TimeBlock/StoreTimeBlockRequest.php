<?php

namespace App\Http\Requests\TimeBlock;

use Illuminate\Foundation\Http\FormRequest;

class StoreTimeBlockRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'project_id' => 'required|exists:projects,id',
        'description' => 'required|string',
        'is_chore' => 'required|boolean',
        'start_time' => 'required|date',
        'end_time' => 'required|date|after_or_equal:start_time',
    ]; }
}
