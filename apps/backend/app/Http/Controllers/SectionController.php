<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Http\Requests\Section\StoreSectionRequest;
use App\Http\Requests\Section\UpdateSectionRequest;

class SectionController extends Controller
{
    public function index()
    {
        return Section::all();
    }

    public function show(string $id)
    {
        return Section::findOrFail($id);
    }

    public function store(StoreSectionRequest $request)
    {
        $item = Section::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateSectionRequest $request, string $id)
    {
        $item = Section::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Section::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
