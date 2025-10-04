<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;

class YearController extends Controller
{
    public function index() {
        return Year::all();
    }

    public function show($id) {
        return Year::findOrFail($id);
    }

    public function store(Request $request) {
        $year = Year::create($request->all());
        return response()->json($year, 201);
    }

    public function update(Request $request, $id) {
        $year = Year::findOrFail($id);
        $year->update($request->all());
        return response()->json($year, 200);
    }

    public function delete($id) {
        Year::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
