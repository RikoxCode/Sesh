<?php

namespace App\Http\Controllers;

use App\Models\TimeBlock;
use App\Http\Requests\TimeBlock\StoreTimeBlockRequest;
use App\Http\Requests\TimeBlock\UpdateTimeBlockRequest;

class TimeBlockController extends Controller
{
    public function index()
    {
        return TimeBlock::all();
    }

    public function show(string $id)
    {
        return TimeBlock::findOrFail($id);
    }

    public function store(StoreTimeBlockRequest $request)
    {
        $item = TimeBlock::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateTimeBlockRequest $request, string $id)
    {
        $item = TimeBlock::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        TimeBlock::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
