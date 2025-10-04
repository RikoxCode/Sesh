<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;
use Illuminate\Support\Str;

class Role extends SpatiePermission
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        parent::booted();

        static::creating(function (self $role) {
            if (empty($role->id)) {
                $role->id = (string) Str::uuid();
            }
        });
    }
}
