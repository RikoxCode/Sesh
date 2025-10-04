<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Chapter extends Model
{
    protected $fillable = [
        'project_id',
        'type',
        'title',
        'subtitle',
    ];

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
