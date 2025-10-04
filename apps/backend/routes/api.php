<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('jwt')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/permissions', [AuthController::class, 'getPermissions']);
    Route::put('/user', [AuthController::class, 'updateUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('jwt')->prefix('project')->group(function () {
    Route::post('/create', [ProjectController::class, 'createProject']);
});

Route::middleware('jwt')->prefix('year')->group(function () {
    Route::get('/', [App\Http\Controllers\YearController::class, 'index']);
    Route::get('/{id}', [App\Http\Controllers\YearController::class, 'show']);
    Route::post('/', [App\Http\Controllers\YearController::class, 'store']);
    Route::put('/{id}', [App\Http\Controllers\YearController::class, 'update']);
    Route::delete('/{id}', [App\Http\Controllers\YearController::class, 'delete']);
});
