<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
