<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use App\Http\Resources\FolderResource;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function index()
    {
        return FolderResource::collection(
            auth()->user()->folders()->get()
        );
    }

    public function show(Folder $folder)
    {
        abort_unless($folder->user_id === auth()->id(), 403);

        return new FolderResource($folder);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
        ]);

        $folder = auth()->user()->folders()->create($validated);

        return new FolderResource($folder);
    }

    public function update(Request $request, Folder $folder)
    {
        abort_unless($folder->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
        ]);

        $folder->update($validated);

        return new FolderResource($folder);
    }

    public function destroy(Folder $folder)
    {
        abort_unless($folder->user_id === auth()->id(), 403);

        $folder->delete();

        return response()->json(['message' => 'Folder deleted']);
    }
}
