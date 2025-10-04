<?php

namespace App\Http\Requests\UserMeta;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserMetaRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'user_id' => 'required|exists:users,id',
        'meta_key' => 'required|string',
        'meta_value' => 'required|string',
    ]; }
}
