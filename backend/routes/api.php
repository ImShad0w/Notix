<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotesController;

Route::get("/notes", [NotesController::class, "show"]);
Route::post("/notes", [NotesController::class, "store"]);
