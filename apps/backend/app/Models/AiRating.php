<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class AiRating extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $aiRating) {
            if (empty($aiRating->id)) {
                $aiRating->id = (string) Str::uuid();
            }
        });
    }
}
