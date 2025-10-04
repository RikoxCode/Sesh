<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Support\Str;

class Role extends SpatieRole
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

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
