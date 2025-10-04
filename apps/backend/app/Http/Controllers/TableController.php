<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Http\Requests\Table\StoreTableRequest;
use App\Http\Requests\Table\UpdateTableRequest;

class TableController extends Controller
{
    public function index()
    {
        return Table::all();
    }

    public function show(string $id)
    {
        return Table::findOrFail($id);
    }

    public function store(StoreTableRequest $request)
    {
        $item = Table::create($request->validated());
        return response()->json($item, 201);
    }

    public function update(UpdateTableRequest $request, string $id)
    {
        $item = Table::findOrFail($id);
        $item->update($request->validated());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Table::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
