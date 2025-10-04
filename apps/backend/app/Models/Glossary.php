<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Glossary extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $glossary) {
            if (empty($glossary->id)) {
                $glossary->id = (string) Str::uuid();
            }
        });
    }
}
