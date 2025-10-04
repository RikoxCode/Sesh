<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;

class ProjectCrudController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function show(string $id)
    {
        return Project::findOrFail($id);
    }

    public function store(StoreProjectRequest $request)
    {
        $item = Project::create($request->all());
        return response()->json($item, 201);
    }

    public function update(UpdateProjectRequest $request, string $id)
    {
        $item = Project::findOrFail($id);
        $item->update($request->all());
        return response()->json($item, 200);
    }

    public function delete(string $id)
    {
        Project::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
