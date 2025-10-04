<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;


class AppController extends Controller
{

    public function getProject(Project $project)
    {
        if (!$project->isOwnedByUser()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $project->load([
            'chapters.sections' => function ($query) {
                $query->with([
                    'children.textBlocks',
                    'children.tables',
                    'children.images',
                    'children.children', 
                    'textBlocks',
                    'tables',
                    'images',
                ]);
            },
        ]);


        return response()->json($project);
    }
}