<?php

namespace App\Http\Requests\SubCriterion;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubCriterionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'criteria_id' => 'sometimes|exists:criteria,id',
        'description' => 'sometimes|string',
    ]; }
}
