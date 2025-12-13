<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Resources\NoteResource;
use Illuminate\Support\Arr;
class NotesController extends Controller
{
    public function show(){
        return NoteResource::collection(Note::all());
    }

    public function showNote(Note $note){
        return $note;
    }

    public function store(Request $request){
        //Get the requested text for the note
        $validated = $request->validate([
            "name" => 'required:string|max:255',
            "text" => 'required:string',
        ]);
        $nextNumber = Note::max('note_number') + 1;
        //Create the new note
        Note::create([
            ...$validated,
            "note_number" => $nextNumber,
        ]);
        //return Succesfull
        return response()->json(["message"=>"Succesfully added note!"]);
    }

    public function modify(Request $request, Note $note)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'text' => 'required|string',
        ]);

        $note->update($validated);

        return response()->json($note);
    }

    public function delete (Note $note){
        $note->delete();
    }
}
