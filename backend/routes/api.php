<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotesController;
use App\Http\Controllers\Auth\AuthController;

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

//API routes, will protect them after cookie-based auth is working
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notes', [NotesController::class, "show"]);
    Route::get('/notes/{note}', [NotesController::class, "showNote"]);
    Route::post('/notes', [NotesController::class, "store"]);
    Route::put('/notes/{note}', [NotesController::class, "modify"]);
    Route::delete('/notes/{note}', [NotesController::class, "delete"]);
});
