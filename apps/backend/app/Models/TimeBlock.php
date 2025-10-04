<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeBlock extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $timeBlock) {
            if (empty($timeBlock->id)) {
                $timeBlock->id = (string) Str::uuid();
            }
        });
    }
}
