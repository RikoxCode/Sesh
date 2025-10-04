<?php

namespace App\Http\Controllers;

use App\Models\Glossary;
use App\Http\Requests\Glossary\StoreGlossaryRequest;
use App\Http\Requests\Glossary\UpdateGlossaryRequest;

class GlossaryController extends Controller
{
    public function index()
    {
        return Glossary::all();
    }

    public function show(string $id)
    {
        return Glossary::findOrFail($id);
    }

    public function store(StoreGlossaryRequest $request)
    {
        $item = Glossary::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateGlossaryRequest $request, string $id)
    {
        $item = Glossary::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Glossary::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
