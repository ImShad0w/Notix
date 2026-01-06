<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Controller;
use App\Models\Folder;
use App\Http\Resources\FolderResource;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Folder::class);

        return FolderResource::collection(
            auth()->user()->folders()->get()
        );
    }

    public function show(Folder $folder)
    {
        $this->authorize('view', $folder);

        return new FolderResource($folder);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Folder::class);

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
        ]);

        $folder = auth()->user()->folders()->create($validated);

        return new FolderResource($folder);
    }

    public function update(Request $request, Folder $folder)
    {

        $this->authorize('update', $folder);

        $validated = $request->validate([
            'name'      => 'required|string|max:255',
        ]);

        $folder->update($validated);

        return new FolderResource($folder);
    }

    public function destroy(Folder $folder)
    {
        $this->authorize('delete', $folder);

        $folder->delete();

        return response()->json(['message' => 'Folder deleted']);
    }
}
