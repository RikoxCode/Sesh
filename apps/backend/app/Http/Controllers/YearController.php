<?php

namespace App\Http\Controllers;

use App\Models\Year;
use App\Http\Requests\Year\StoreYearRequest;
use App\Http\Requests\Year\UpdateYearRequest;

class YearController extends Controller
{
    public function index()
    {
        return Year::all();
    }

    public function show($id)
    {
        return Year::findOrFail($id);
    }

    public function store(StoreYearRequest $request)
    {
        $year = Year::create($request->validated());
        return response()->json($year, 201);
    }

    public function update(UpdateYearRequest $request, $id)
    {
        $year = Year::findOrFail($id);
        $year->update($request->validated());
        return response()->json($year, 200);
    }

    public function delete($id)
    {
        Year::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
