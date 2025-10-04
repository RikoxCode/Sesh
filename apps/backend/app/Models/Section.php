<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Section extends Model
{
    /** @use HasFactory<\Database\Factories\SectionFactory> */
    use HasFactory;

    protected $fillable = [
        'chapter_id',
        'parent_id',
        'position',
        'title',
        'subtitle',
        'rating_checksum',
    ];

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
