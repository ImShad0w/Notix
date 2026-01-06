<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ["name", "text", "folder_id"];
    protected $hidden = ["user_id"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function notes()
    {
        return $this->belongsTo(Folder::class);
    }
}
