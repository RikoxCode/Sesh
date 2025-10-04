<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TimeBlock extends Model
{
    protected $fillable = [
        'project_id',
        'description',
        'is_chore',
        'start_time',
        'end_time',
    ];

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
