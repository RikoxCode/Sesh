<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Str;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = ['year_id', 'name', 'owner_id', 'description', 'start_date', 'end_date'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $project) {
            if (empty($project->id)) {
                $project->id = (string) Str::uuid();
            }
        });
    }

    // Relationships

    /**
     * The year this project belongs to.
     */
    public function year(): BelongsTo
    {
        return $this->belongsTo(Year::class);
    }

    /**
     * The user who owns this project.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Chapters within this project.
     */
    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class);
    }

    /**
     * Sections within this project via chapters.
     */
    public function sections(): HasManyThrough
    {
        return $this->hasManyThrough(Section::class, Chapter::class, 'project_id', 'chapter_id');
    }

    /**
     * Glossary entries defined for this project.
     */
    public function glossaryEntries(): HasMany
    {
        return $this->hasMany(Glossary::class);
    }

    /**
     * Time blocks associated with this project.
     */
    public function timeBlocks(): HasMany
    {
        return $this->hasMany(TimeBlock::class);
    }

    /**
     * Special criteria tied specifically to this project.
     */
    public function specialCriteria(): HasMany
    {
        return $this->hasMany(Criterion::class, 'special_for_project_id');
    }
}
