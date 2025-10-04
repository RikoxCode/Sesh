<?php

namespace App\Http\Requests\UserMeta;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserMetaRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'user_id' => 'sometimes|exists:users,id',
        'meta_key' => 'sometimes|string',
        'meta_value' => 'sometimes|string',
    ]; }
}
