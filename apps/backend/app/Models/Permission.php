<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;
use Illuminate\Support\Str;

class Permission extends SpatiePermission
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        parent::booted();

        static::creating(function (self $permission) {
            if (empty($permission->id)) {
                $permission->id = (string) Str::uuid();
            }
        });
    }
}
