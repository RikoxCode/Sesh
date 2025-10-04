<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Year extends Model
{
    protected $fillable = [
        'year',
        'is_active',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $year) {
            if (empty($year->id)) {
                $year->id = (string) Str::uuid();
            }
        });
    }
}
