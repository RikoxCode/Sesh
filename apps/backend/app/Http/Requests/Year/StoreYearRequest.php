<?php

namespace App\Http\Requests\Year;

use Illuminate\Foundation\Http\FormRequest;

class StoreYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'year' => 'required|integer|min:1900|max:3000',
            'is_active' => 'required|boolean',
        ];
    }
}
