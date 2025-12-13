<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ["name", "text", "note_number"];
    protected $hidden = ["id"];

    public function getRouteKeyName()
    {
        return 'note_number';
    }
}
