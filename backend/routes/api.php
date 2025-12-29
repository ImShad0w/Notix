<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotesController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\FolderController;

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    //Notes protected API routes
    Route::get('/notes', [NotesController::class, "show"]);
    Route::get('/notes/{note}', [NotesController::class, "showNote"]);
    Route::post('/notes', [NotesController::class, "store"]);
    Route::put('/notes/{note}', [NotesController::class, "modify"]);
    Route::delete('/notes/{note}', [NotesController::class, "delete"]);
    //Folder protected API Routes
    Route::get('/folders', [FolderController::class, "show"]);
    Route::post('/folders', [FolderController::class, "store"]);
    Route::put('/folders/{folder}', [FolderController::class, "modify"]);
    Route::delete('/folders/{folder}', [FolderController::class, "delete"]);
    Route::get('/me', [AuthController::class, 'me']);
});
