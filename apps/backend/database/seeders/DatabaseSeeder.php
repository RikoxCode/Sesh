<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Year, User, Project, Chapter, Section, TextBlock, Table as TableModel, Image, AiRating, Glossary, Criterion, SubCriterion, TimeBlock, UserMeta, UserSubCriterion};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with simple demo data.
     */
    public function run(): void
    {
        // Base data
        $years = Year::factory()->count(rand(5, 10))->create();
        $users = User::factory()->count(rand(5, 10))->create();

        // Projects linked to existing Years and Users
        $projects = Project::factory()->count(rand(5, 10))->make()->each(function (Project $project) use ($years, $users) {
            $project->year_id = $years->random()->id;
            $project->owner_id = $users->random()->id;
            $project->save();
        });

        // Chapters linked to Projects
        $chapters = Chapter::factory()->count(rand(5, 10))->make()->each(function (Chapter $chapter) use ($projects) {
            $chapter->project_id = $projects->random()->id;
            $chapter->save();
        });

        // Sections linked to Chapters
        $sections = Section::factory()->count(rand(5, 10))->make()->each(function (Section $section) use ($chapters) {
            $section->chapter_id = $chapters->random()->id;
            $section->parent_id = null;
            $section->save();
        });

        // Content linked to Sections
        TextBlock::factory()->count(rand(5, 10))->make()->each(function (TextBlock $tb) use ($sections) {
            $tb->section_id = $sections->random()->id;
            $tb->save();
        });

        TableModel::factory()->count(rand(5, 10))->make()->each(function (TableModel $tbl) use ($sections) {
            $tbl->section_id = $sections->random()->id;
            $tbl->save();
        });

        Image::factory()->count(rand(5, 10))->make()->each(function (Image $img) use ($sections) {
            $img->section_id = $sections->random()->id;
            $img->save();
        });

        AiRating::factory()->count(rand(5, 10))->make()->each(function (AiRating $r) use ($sections) {
            $r->section_id = $sections->random()->id;
            $r->save();
        });

        // Glossary terms linked to Projects
        Glossary::factory()->count(rand(5, 10))->make()->each(function (Glossary $g) use ($projects) {
            $g->project_id = $projects->random()->id;
            $g->save();
        });

        // Criteria and SubCriteria linked to Years/Criteria
        $criteria = Criterion::factory()->count(rand(5, 10))->make()->each(function (Criterion $c) use ($years) {
            $c->year_id = $years->random()->id;
            $c->special_for_project_id = null;
            $c->save();
        });

        $subCriteria = SubCriterion::factory()->count(rand(5, 10))->make()->each(function (SubCriterion $sc) use ($criteria) {
            $sc->criteria_id = $criteria->random()->id;
            $sc->save();
        });

        // Time tracking linked to Projects
        TimeBlock::factory()->count(rand(5, 10))->make()->each(function (TimeBlock $tb) use ($projects) {
            $tb->project_id = $projects->random()->id;
            $tb->save();
        });

        // User meta and user-sub-criteria
        UserMeta::factory()->count(rand(5, 10))->make()->each(function (UserMeta $um) use ($users) {
            $um->user_id = $users->random()->id;
            $um->save();
        });

        UserSubCriterion::factory()->count(rand(5, 10))->make()->each(function (UserSubCriterion $usc) use ($users, $subCriteria) {
            $usc->user_id = $users->random()->id;
            $usc->sub_criteria_id = $subCriteria->random()->id;
            $usc->save();
        });
    }
}
