<?php

namespace App\Http\Requests\UserSubCriterion;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserSubCriterionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'sub_criteria_id' => 'sometimes|exists:sub_criteria,id',
        'user_id' => 'sometimes|exists:users,id',
        'is_fulfilled' => 'sometimes|boolean',
    ]; }
}
