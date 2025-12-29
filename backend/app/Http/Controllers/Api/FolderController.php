<?php

namespace App\Http\Controllers\Api;

use App\Models\Folder;
use Illuminate\Http\Request;
use App\Http\Resources\FolderResource;

class FolderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => 'required|string|max:200',
        ]);

        $nextNumber = auth()->user()->folders()->max('folder_id') + 1;

        auth()->user()->folders()->create([
            ...$validated,
            "folder_id" => $nextNumber,
        ]);

        return response()->json(["message" => "Succesfully created folder!"]);
    }

    public function show()
    {
        return FolderResource::collection(
            auth()->user()->folders()->get()
        );
    }

    public function modify(Request $request, Folder $folder)
    {
        abort_unless($folder->user_id === auth()->id(), 403);

        $validated = $request->validate([
            "name" => 'required|string|max:200',
        ]);

        $folder->update($validated);

        return new FolderResource($folder);
    }

    public function delete(Folder $folder)
    {
        abort_unless($folder->user_id === auth()->id(), 403);

        $folder->delete();
    }
}
