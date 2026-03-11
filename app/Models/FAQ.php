<?php

namespace App\Models;

use App\Traits\HasAdvancedFilter;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class FAQ extends Model
{
    use HasTranslations, HasAdvancedFilter;

    protected $table = 'faqs';
    protected $fillable = ['question', 'answer', 'category'];
    protected $filterable = ['question', 'answer'];
    public $translatable = ['question', 'answer'];

    public static function getValidCategories()
    {
        return ['about the brand', 'room', 'facility', 'activity', 'common'];
    }

    public static function isValidCategory($category)
    {
        return in_array($category, self::getValidCategories());
    }
}
