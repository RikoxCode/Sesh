<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Http\Requests\Image\StoreImageRequest;
use App\Http\Requests\Image\UpdateImageRequest;

class ImageController extends Controller
{
    public function index()
    {
        return Image::all();
    }

    public function show(string $id)
    {
        return Image::findOrFail($id);
    }

    public function store(StoreImageRequest $request)
    {
        $item = Image::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateImageRequest $request, string $id)
    {
        $item = Image::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Image::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
