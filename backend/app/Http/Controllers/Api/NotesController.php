<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Resources\NoteResource;
use Illuminate\Support\Arr;
use App\Http\Controllers\Api\Controller;

class NotesController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Note::class);

        return NoteResource::collection(
            auth()->user()->notes()->get()
        );
    }

    public function show(Note $note)
    {
        $this->authorize('view', $note);

        return new NoteResource($note);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Note::class);

        $validated = $request->validate([
            "name" => 'required|string|max:255',
            "text" => 'required|string',
        ]);

        $note = auth()->user()->notes()->create($validated);

        return new NoteResource($note);
    }

    public function update(Request $request, Note $note)
    {

        $this->authorize('update', $note);

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
        $this->authorize('delete', $note);

        $note->delete();
    }
}
