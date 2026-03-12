<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $coverImage = $this->getFirstMedia('cover');

        return [
            'id' => $this->id,
            'category' => $this->category_id,
            'categorySelected' => $this->category_id ? [
                'value' => $this->category_id,
                'label' => $this->category?->getTranslation('name', 'en') ?? '',
            ] : null,
            'title' => $this->getTranslations('title'),
            'slug' => $this->getTranslations('slug'),
            'excerpt' => $this->getTranslations('excerpt'),
            'content' => $this->getTranslations('content'),
            'status' => $this->status,
            'statusSelected' => [
                'value' => $this->status,
                'label' => ucfirst($this->status),
            ],
            'published_at' => $this->published_at,
            'tags' => $this->tags()->pluck('id')->toArray(),
            'tagsSelected' => $this->tags()->get()->map(function ($tag) {
                return [
                    'value' => $tag->id,
                    'label' => $tag->getTranslation('name', 'en'),
                ];
            })->toArray(),
            'cover_image' => $coverImage ? [
                'id' => $coverImage->id,
                'url' => $coverImage->getUrl(),
                'thumb' => $coverImage->getUrl('thumb'),
            ] : null,
        ];
    }
}
