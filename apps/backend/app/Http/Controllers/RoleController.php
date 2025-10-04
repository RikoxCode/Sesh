<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;

class RoleController extends Controller
{
    public function index()
    {
        return Role::all();
    }

    public function show(string $id)
    {
        return Role::findOrFail($id);
    }

    public function store(StoreRoleRequest $request)
    {
        $item = Role::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateRoleRequest $request, string $id)
    {
        $item = Role::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Role::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
