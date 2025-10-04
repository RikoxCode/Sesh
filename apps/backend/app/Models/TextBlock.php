<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TextBlock extends Model
{
    /** @use HasFactory<\Database\Factories\TextBlockFactory> */
    use HasFactory;

    protected $fillable = ['section_id', 'position', 'heading', 'text', 'source'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $textBlock) {
            if (empty($textBlock->id)) {
                $textBlock->id = (string) Str::uuid();
            }
        });
    }
}
