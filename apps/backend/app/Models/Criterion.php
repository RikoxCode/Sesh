<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Criterion extends Model
{
    /** @use HasFactory<\Database\Factories\CriterionFactory> */
    use HasFactory;

    protected $fillable = ['year_id', 'title', 'description', 'special_for_project_id'];

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
