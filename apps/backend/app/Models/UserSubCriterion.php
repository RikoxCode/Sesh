<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserSubCriterion extends Model
{
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
