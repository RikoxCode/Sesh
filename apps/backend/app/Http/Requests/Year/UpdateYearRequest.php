<?php

namespace App\Http\Requests\Year;

use Illuminate\Foundation\Http\FormRequest;

class UpdateYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'year' => 'sometimes|integer|min:1900|max:3000',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
