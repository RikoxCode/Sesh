<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, HasPermissions;

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $user) {
            if (empty($user->id)) {
                $user->id = (string) Str::uuid();
            }
        });
    }

    protected $fillable = ['first_name', 'last_name', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];

    protected function casts()
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // Relationships

    /**
     * Projects owned by the user.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'owner_id');
    }

    /**
     * Additional metadata entries for the user.
     */
    public function meta(): HasMany
    {
        return $this->hasMany(UserMeta::class);
    }

    /**
     * UserSubCriterion flags for this user.
     */
    public function userSubCriteria(): HasMany
    {
        return $this->hasMany(UserSubCriterion::class);
    }
}
