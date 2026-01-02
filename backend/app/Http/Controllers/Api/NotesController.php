<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Resources\NoteResource;
use Illuminate\Support\Arr;

class NotesController extends Controller
{
    public function index()
    {
        return NoteResource::collection(
            auth()->user()->notes()->get()
        );
    }

    public function show(Note $note)
    {
        abort_unless($note->user_id === auth()->id(), 403);

        return new NoteResource($note);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => 'required|string|max:255',
            "text" => 'required|string',
        ]);

        $note = auth()->user()->notes()->create($validated);

        return new NoteResource($note);
    }

    public function update(Request $request, Note $note)
    {

        abort_unless($note->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'folder_id' => 'nullable|exists:folders,id',
        ]);

        $note->update($validated);

        return new NoteResource($note);
    }

    public function destroy(Note $note)
    {
        abort_unless($note->user_id === auth()->id(), 403);

        $note->delete();
    }
}
