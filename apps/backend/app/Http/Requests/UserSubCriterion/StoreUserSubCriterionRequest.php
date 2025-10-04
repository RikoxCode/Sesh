<?php

namespace App\Http\Requests\UserSubCriterion;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserSubCriterionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'sub_criteria_id' => 'required|exists:sub_criteria,id',
        'user_id' => 'required|exists:users,id',
        'is_fulfilled' => 'required|boolean',
    ]; }
}
