<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Table extends Model
{
    /** @use HasFactory<\Database\Factories\TableFactory> */
    use HasFactory;

    protected $fillable = ['section_id', 'position', 'heading', 'markdown_table', 'source'];

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
