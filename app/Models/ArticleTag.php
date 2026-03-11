<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ArticleTag extends Pivot
{
    protected $table = 'article_tag';

    protected $primaryKey = [
        'article_id',
        'tag_id',
    ];

    protected $fillable = [
        'article_id',
        'tag_id',
    ];

    public $timestamps = false;
    public $incrementing = false;

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}
