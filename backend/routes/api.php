<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotesController;
use App\Http\Controllers\Api\AuthController;

//API routes, will protect them after cookie-based auth is working
Route::controller(NotesController::class)->group(function () {
    Route::get("/notes", "show");
    Route::get("/notes/{note}", "showNote");
    Route::post("/notes", "store");
    Route::put('/notes/{note}', [NotesController::class, 'modify']);
    Route::delete('/notes/{note}', [NotesController::class, 'delete']);
});

Route::middleware('web')->group(function () {
    Route::post("/register", [AuthController::class, "register"]);
    Route::get("/me", [AuthController::class, "me"]);
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::post("/login", [AuthController::class, 'login']);
});
