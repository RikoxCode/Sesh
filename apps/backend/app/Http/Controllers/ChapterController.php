<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Http\Requests\Chapter\StoreChapterRequest;
use App\Http\Requests\Chapter\UpdateChapterRequest;

class ChapterController extends Controller
{
    public function index()
    {
        return Chapter::all();
    }

    public function show(string $id)
    {
        return Chapter::findOrFail($id);
    }

    public function store(StoreChapterRequest $request)
    {
        $item = Chapter::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateChapterRequest $request, string $id)
    {
        $item = Chapter::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Chapter::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
