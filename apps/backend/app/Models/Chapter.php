<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Chapter extends Model
{
    /** @use HasFactory<\Database\Factories\ChapterFactory> */
    use HasFactory;

    protected $fillable = ['project_id', 'type', 'title', 'subtitle'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $chapter) {
            if (empty($chapter->id)) {
                $chapter->id = (string) Str::uuid();
            }
        });
    }

    // Relationships

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }
}
