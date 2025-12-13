<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NotesController;

Route::controller(NotesController::class)->group(function(){
    Route::get("/notes", "show");
    Route::get("/notes/{note}", "showNote");
    Route::post("/notes", "store");
    Route::put('/notes/{note}', [NotesController::class, 'modify']);
    Route::delete('/notes/{note}', [NotesController::class, 'delete']);
});
