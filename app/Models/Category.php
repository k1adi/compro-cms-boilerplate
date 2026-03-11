<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    use HasTranslations;

    protected $table = 'categories';
    protected $fillable = ['name'];
    public $translatable = ['name'];

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
