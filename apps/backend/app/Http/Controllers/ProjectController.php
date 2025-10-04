<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Chapter;


class ProjectController extends Controller
{
    public function createProject(Request $request)
    {
        $validatedData = $request->validate([
            'year_id' => 'required|exists:years,id',
            'owner_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $project = new Project($validatedData);
        $project->save();

        $new_project_id = $project->id;

        $defaultChapters = [
            ['name' => 'Ausführung und Resultat der Arbeit', 'type' => 'execution'],
            ['name' => 'Dokumentation', 'type' => 'documentation'],
            ['name' => 'Präsentation und Fachgespräch', 'type' => 'presentation'],
        ];
        foreach ($defaultChapters as $chapterData) {
            $chapter = new Chapter([
                'project_id' => $new_project_id,
                'title' => $chapterData['name'],
                'type' => $chapterData['type'],
                'subtitle' => '',
            ]);
            $chapter->save();
        }


        return response()->json(['message' => 'Project created successfully', 'project' => $project], 201);
    }
}
