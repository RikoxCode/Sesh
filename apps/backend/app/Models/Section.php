<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Section extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $section) {
            if (empty($section->id)) {
                $section->id = (string) Str::uuid();
            }
        });
    }
}
