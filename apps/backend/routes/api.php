<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;

$tables = [
    'ai_ratings',
    'cache',
    'cache_locks',
    'chapters',
    'criteria',
    'failed_jobs',
    'glossaries',
    'images',
    'job_batches',
    'jobs',
    'migrations',
    'model_has_permissions',
    'model_has_roles',
    'password_reset_tokens',
    'permissions',
    'personal_access_tokens',
    'projects',
    'role_has_permissions',
    'roles',
    'sections',
    'sessions',
    'sub_criteria',
    'tables',
    'text_blocks',
    'time_blocks',
    'user_metas',
    'user_sub_criteria',
    'users',
    'years',
];

// Auth
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::middleware('jwt')
    ->prefix('auth')
    ->group(function () {
        Route::get('/', [AuthController::class, 'getUser']);
        Route::put('/user', [AuthController::class, 'updateUser']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

// CRUD
foreach ($tables as $table) {
    $controller = str_replace(' ', '', ucwords(str_replace('_', ' ', \Illuminate\Support\Str::singular($table)))) . 'Controller';

    Route::middleware('jwt')
        ->prefix("crud/{$table}")
        ->group(function () use ($controller) {
            Route::get('/', ["App\\Http\\Controllers\\$controller", 'index']);
            Route::get('/{id}', ["App\\Http\\Controllers\\$controller", 'show']);
            Route::post('/', ["App\\Http\\Controllers\\$controller", 'store']);
            Route::put('/{id}', ["App\\Http\\Controllers\\$controller", 'update']);
            Route::delete('/{id}', ["App\\Http\\Controllers\\$controller", 'delete']);
        });
}


Route::middleware('jwt')
    ->prefix('project')
    ->group(function () {
        Route::post('/create', [ProjectController::class, 'createProject']);
    });


