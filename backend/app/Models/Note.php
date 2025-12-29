<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ["name", "text", "note_number", "folder_id"];
    protected $hidden = ["id" ,"user_id"];

    public function getRouteKeyName()
    {
        return 'note_number';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function notes()
    {
        return $this->belongsTo(Folder::class);
    }
}
