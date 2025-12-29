<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Resources\NoteResource;
use Illuminate\Support\Arr;

class NotesController extends Controller
{
    public function show()
    {
        return NoteResource::collection(
            auth()->user()->notes()->get()
        );
    }

    public function showNote(Note $note)
    {
        //Sees if the user has notes
        abort_unless($note->user_id === auth()->id(), 403);

        return new NoteResource($note);
    }

    public function store(Request $request)
    {
        //Get the requested text for the note
        $validated = $request->validate([
            "name" => 'required:string|max:255',
            "text" => 'required:string',
        ]);

        //Get the highest number of the notes of the user
        $nextNumber = auth()->user()->notes()->max('note_number') + 1;

        //Create the new note based on the user
        auth()->user()->notes()->create([
            ...$validated,
            'note_number' => $nextNumber,
        ]);

        return response()->json(["message" => "Succesfully added note!"]);
    }

    public function modify(Request $request, Note $note)
    {

        abort_unless($note->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'folder_id' => 'nullable|integer',
        ]);

        $note->update($validated);

        return new NoteResource($note);
    }

    public function delete(Note $note)
    {
        abort_unless($note->user_id === auth()->id(), 403);

        $note->delete();
    }
}
