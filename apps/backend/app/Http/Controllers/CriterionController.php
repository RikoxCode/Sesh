<?php

namespace App\Http\Controllers;

use App\Models\Criterion;
use App\Http\Requests\Criterion\StoreCriterionRequest;
use App\Http\Requests\Criterion\UpdateCriterionRequest;

class CriterionController extends Controller
{
    public function index()
    {
        return Criterion::all();
    }

    public function show(string $id)
    {
        return Criterion::findOrFail($id);
    }

    public function store(StoreCriterionRequest $request)
    {
        $item = Criterion::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateCriterionRequest $request, string $id)
    {
        $item = Criterion::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Criterion::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
