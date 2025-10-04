<?php

namespace App\Http\Controllers;

use App\Models\TextBlock;
use App\Http\Requests\TextBlock\StoreTextBlockRequest;
use App\Http\Requests\TextBlock\UpdateTextBlockRequest;

class TextBlockController extends Controller
{
    public function index()
    {
        return TextBlock::all();
    }

    public function show(string $id)
    {
        return TextBlock::findOrFail($id);
    }

    public function store(StoreTextBlockRequest $request)
    {
        $item = TextBlock::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateTextBlockRequest $request, string $id)
    {
        $item = TextBlock::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        TextBlock::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
