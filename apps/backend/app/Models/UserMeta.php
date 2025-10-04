<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $userMeta) {
            if (empty($userMeta->id)) {
                $userMeta->id = (string) Str::uuid();
            }
        });
    }
}
