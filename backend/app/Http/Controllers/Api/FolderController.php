<?php

namespace App\Http\Controllers\Api;

use App\Models\Folder;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => 'required|string|max:200',
        ]);

        auth()->user()->folders()->create(["name" => $validated["name"]]);

        return response()->json(["message" => "Succesfully created folder!"]);
    }

    public function show()
    {
        return auth()->user()->folders()->get();
    }
}
