<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'name' => 'required|string|unique:permissions,name',
        'guard_name' => 'nullable|string',
    ]; }
}
