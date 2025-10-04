<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SubCriterion extends Model
{
    /** @use HasFactory<\Database\Factories\SubCriterionFactory> */
    use HasFactory;

    protected $fillable = ['criteria_id', 'description'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $subCriterion) {
            if (empty($subCriterion->id)) {
                $subCriterion->id = (string) Str::uuid();
            }
        });
    }
}
