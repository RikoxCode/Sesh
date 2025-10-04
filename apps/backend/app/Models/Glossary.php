<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Glossary extends Model
{
    /** @use HasFactory<\Database\Factories\GlossaryFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'term',
        'definition',
    ];

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
