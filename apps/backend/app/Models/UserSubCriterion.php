<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserSubCriterion extends Model
{
    /** @use HasFactory<\Database\Factories\UserSubCriterionFactory> */
    use HasFactory;

    protected $fillable = ['sub_criteria_id', 'user_id', 'is_fulfilled'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $userSubCriterion) {
            if (empty($userSubCriterion->id)) {
                $userSubCriterion->id = (string) Str::uuid();
            }
        });
    }
}
