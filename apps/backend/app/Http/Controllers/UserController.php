<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show(string $id)
    {
        return User::findOrFail($id);
    }

    public function store(StoreUserRequest $request)
    {
        $item = User::create($request->all());
        return response()->json($item, 201);
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        $item = User::findOrFail($id);
        $item->update($request->all());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        User::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
