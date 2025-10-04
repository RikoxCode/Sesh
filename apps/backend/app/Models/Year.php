<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Year extends Model
{
    /** @use HasFactory<\Database\Factories\YearFactory> */
    use HasFactory;

    protected $fillable = ['year', 'is_active'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $year) {
            if (empty($year->id)) {
                $year->id = (string) Str::uuid();
            }
        });
    }

    // Relationships

    /**
     * Projects that belong to this year.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Criteria defined for this year.
     */
    public function criteria(): HasMany
    {
        return $this->hasMany(Criterion::class);
    }
}
