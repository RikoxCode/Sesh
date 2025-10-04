<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Criterion extends Model
{
    /** @use HasFactory<\Database\Factories\CriterionFactory> */
    use HasFactory;

    protected $fillable = ['year_id', 'title', 'description', 'special_for_project_id'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $criterion) {
            if (empty($criterion->id)) {
                $criterion->id = (string) Str::uuid();
            }
        });
    }

    // Relationships

    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class);
    }

    public function specialForProject(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'special_for_project_id');
    }

    public function subCriteria(): HasMany
    {
        return $this->hasMany(SubCriterion::class, 'criteria_id');
    }
}
