<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TextBlock extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $textBlock) {
            if (empty($textBlock->id)) {
                $textBlock->id = (string) Str::uuid();
            }
        });
    }
}
