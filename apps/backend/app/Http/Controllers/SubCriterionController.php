<?php

namespace App\Http\Controllers;

use App\Models\SubCriterion;
use App\Http\Requests\SubCriterion\StoreSubCriterionRequest;
use App\Http\Requests\SubCriterion\UpdateSubCriterionRequest;

class SubCriterionController extends Controller
{
    public function index()
    {
        return SubCriterion::all();
    }

    public function show(string $id)
    {
        return SubCriterion::findOrFail($id);
    }

    public function store(StoreSubCriterionRequest $request)
    {
        $item = SubCriterion::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateSubCriterionRequest $request, string $id)
    {
        $item = SubCriterion::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        SubCriterion::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
