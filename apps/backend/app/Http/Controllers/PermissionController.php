<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;

class PermissionController extends Controller
{
    public function index()
    {
        return Permission::all();
    }

    public function show(string $id)
    {
        return Permission::findOrFail($id);
    }

    public function store(StorePermissionRequest $request)
    {
        $item = Permission::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdatePermissionRequest $request, string $id)
    {
        $item = Permission::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Permission::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
