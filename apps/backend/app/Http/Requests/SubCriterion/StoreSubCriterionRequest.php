<?php

namespace App\Http\Requests\SubCriterion;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubCriterionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'criteria_id' => 'required|exists:criteria,id',
        'description' => 'required|string',
    ]; }
}
