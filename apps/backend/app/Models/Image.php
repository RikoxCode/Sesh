<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Image extends Model
{
    protected $fillable = [
        'section_id',
        'position',
        'image_data',
        'description',
        'source',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $image) {
            if (empty($image->id)) {
                $image->id = (string) Str::uuid();
            }
        });
    }
}
