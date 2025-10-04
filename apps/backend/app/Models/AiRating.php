<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class AiRating extends Model
{
    /** @use HasFactory<\Database\Factories\AiRatingFactory> */
    use HasFactory;

    protected $fillable = ['section_id', 'rating', 'rating_description', 'rating_checksum'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function (self $aiRating) {
            if (empty($aiRating->id)) {
                $aiRating->id = (string) Str::uuid();
            }
        });
    }

    // Relationships

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }
}
