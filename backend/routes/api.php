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
    Route::get('/notes', [NotesController::class, "index"]);
    Route::get('/notes/{note}', [NotesController::class, "show"]);
    Route::post('/notes', [NotesController::class, "store"]);
    Route::put('/notes/{note}', [NotesController::class, "update"]);
    Route::delete('/notes/{note}', [NotesController::class, "destroy"]);
    //Folder protected API Routes
    Route::get('/folders', [FolderController::class, "index"]);
    Route::post('/folders', [FolderController::class, "store"]);
    Route::put('/folders/{folder}', [FolderController::class, "update"]);
    Route::delete('/folders/{folder}', [FolderController::class, "destroy"]);
    //Added it here to confirm that i am logged in or not
    Route::get('/me', [AuthController::class, 'me']);
});
