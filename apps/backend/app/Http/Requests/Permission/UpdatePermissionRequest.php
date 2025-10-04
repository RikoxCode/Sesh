<?php

namespace App\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePermissionRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return [
        'name' => 'sometimes|string|unique:permissions,name,' . $this->route('id'),
        'guard_name' => 'nullable|string',
    ]; }
}
