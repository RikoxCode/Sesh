<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $tableEntry) {
            if (empty($tableEntry->id)) {
                $tableEntry->id = (string) Str::uuid();
            }
        });
    }
}
