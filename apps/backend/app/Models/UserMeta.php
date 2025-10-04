<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserMeta extends Model
{
    protected $fillable = [
        'user_id',
        'meta_key',
        'meta_value',
    ];

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
