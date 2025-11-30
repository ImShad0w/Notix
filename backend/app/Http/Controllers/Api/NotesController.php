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
        //Create the new note
        Note::create([$validated]);
        //return Succesfull
        return response()->json(["message"=>"Succesfully added note!"]);
    }

    public function modify(Request $request, string $id){

        //Validate the input
        $validated = $request->validate([
            "name" => 'required:string|max:255',
            "text" => 'required:string',
        ]);

        //Pull the stuff i need
        $name = Arr::pull($validated, 'name');
        $text = Arr::pull($validated, 'text');

        //Find the note
        $note = Note::find($id);
        $note->name = $name;
        $note->text = $text;
        $note->save();
    }

    public function delete (string $id){
        $note = Note::find($id);
        $note->delete();
    }
}
