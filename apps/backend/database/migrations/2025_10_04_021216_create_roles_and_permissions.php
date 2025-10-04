<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $apprentice_role = \App\Models\Role::create(['name' => 'apprentice']);
        $mentor_role = \App\Models\Role::create(['name' => 'mentor']);
        $supervisor_role = \App\Models\Role::create(['name' => 'supervisor']);
        $admin_role = \App\Models\Role::create(['name' => 'admin']);

        $view_projects = \App\Models\Permission::create(['name' => 'view projects']);
        $edit_projects = \App\Models\Permission::create(['name' => 'edit projects']);
        $create_projects = \App\Models\Permission::create(['name' => 'create projects']);
        $manage_projects = \App\Models\Permission::create(['name' => 'manage projects']);

        $view_users = \App\Models\Permission::create(['name' => 'view users']);
        $manage_users = \App\Models\Permission::create(['name' => 'manage users']);

        $view_years = \App\Models\Permission::create(['name' => 'view years']);
        $manage_years = \App\Models\Permission::create(['name' => 'manage years']);

        $view_criteria = \App\Models\Permission::create(['name' => 'view criteria']);
        $manage_criteria = \App\Models\Permission::create(['name' => 'manage criteria']);

        $apprentice_role->givePermissionTo($edit_projects, $view_criteria);
        $mentor_role->givePermissionTo(
            $create_projects,
            $view_projects,
            $view_users,
            $view_years,
            $view_criteria,
            $manage_criteria,
        );
        $supervisor_role->givePermissionTo(
            $manage_projects,
            $view_users,
            $manage_years,
            $manage_criteria,
            $manage_years,
        );
        $admin_role->givePermissionTo(\App\Models\Permission::all());
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
