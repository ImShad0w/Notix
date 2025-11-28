<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Resources\NoteResource;

class NotesController extends Controller
{
    public function show(){
        return NoteResource::collection(Note::all());
    }

    public function store(Request $request){
        //Get the requested text for the note
        $text = $request->text;
        //Create the new note
        Note::create(["text" => $text]);
        //return Succesfull
        return response()->json(["message"=>"Succesfully added note!"]);
    }
}
