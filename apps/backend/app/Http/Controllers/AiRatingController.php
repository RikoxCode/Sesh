<?php

namespace App\Http\Controllers;

use App\Models\AiRating;
use App\Http\Requests\AiRating\StoreAiRatingRequest;
use App\Http\Requests\AiRating\UpdateAiRatingRequest;

class AiRatingController extends Controller
{
    public function index()
    {
        return AiRating::all();
    }

    public function show(string $id)
    {
        return AiRating::findOrFail($id);
    }

    public function store(StoreAiRatingRequest $request)
    {
        $item = AiRating::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateAiRatingRequest $request, string $id)
    {
        $item = AiRating::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        AiRating::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
