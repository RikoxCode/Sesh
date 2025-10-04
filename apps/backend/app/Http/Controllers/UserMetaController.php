<?php

namespace App\Http\Controllers;

use App\Models\UserMeta;
use App\Http\Requests\UserMeta\StoreUserMetaRequest;
use App\Http\Requests\UserMeta\UpdateUserMetaRequest;

class UserMetaController extends Controller
{
    public function index()
    {
        return UserMeta::all();
    }

    public function show(string $id)
    {
        return UserMeta::findOrFail($id);
    }

    public function store(StoreUserMetaRequest $request)
    {
        $item = UserMeta::create($request->all());
        return response()->json($item, 201);
    }

    public function update(UpdateUserMetaRequest $request, string $id)
    {
        $item = UserMeta::findOrFail($id);
        $item->update($request->all());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        UserMeta::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
