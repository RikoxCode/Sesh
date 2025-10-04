<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $chapter) {
            if (empty($chapter->id)) {
                $chapter->id = (string) Str::uuid();
            }
        });
    }
}
