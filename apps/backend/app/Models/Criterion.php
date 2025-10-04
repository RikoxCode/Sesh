<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Criterion extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $criterion) {
            if (empty($criterion->id)) {
                $criterion->id = (string) Str::uuid();
            }
        });
    }
}
