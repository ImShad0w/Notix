<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    protected $fillable = ["name", "folder_num"];

    protected $hidden = ["id"];

    public function getRouteKeyName()
    {
        return 'folder_num';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
