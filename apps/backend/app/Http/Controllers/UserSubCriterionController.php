<?php

namespace App\Http\Controllers;

use App\Models\UserSubCriterion;
use App\Http\Requests\UserSubCriterion\StoreUserSubCriterionRequest;
use App\Http\Requests\UserSubCriterion\UpdateUserSubCriterionRequest;

class UserSubCriterionController extends Controller
{
    public function index()
    {
        return UserSubCriterion::all();
    }

    public function show(string $id)
    {
        return UserSubCriterion::findOrFail($id);
    }

    public function store(StoreUserSubCriterionRequest $request)
    {
        $item = UserSubCriterion::create($request->all());
        return response()->json($item, 201);
    }

    public function update(UpdateUserSubCriterionRequest $request, string $id)
    {
        $item = UserSubCriterion::findOrFail($id);
        $item->update($request->all());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        UserSubCriterion::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
