<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Section extends Model
{
    /** @use HasFactory<\Database\Factories\SectionFactory> */
    use HasFactory;

    protected $fillable = [
        'chapter_id',
        'parent_id',
        'position',
        'title',
        'subtitle',
        'rating_checksum',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $section) {
            if (empty($section->id)) {
                $section->id = (string) Str::uuid();
            }
        });
    }

    // Relationships

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Section::class, 'parent_id');
    }

    public function textBlocks(): HasMany
    {
        return $this->hasMany(TextBlock::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function tables(): HasMany
    {
        return $this->hasMany(Table::class);
    }

    public function aiRatings(): HasMany
    {
        return $this->hasMany(AiRating::class);
    }
}
