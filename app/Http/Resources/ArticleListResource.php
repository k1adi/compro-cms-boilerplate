<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleListResource extends JsonResource
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
            'title' => $this->getTranslations('title'),
            'excerpt' => $this->getTranslations('excerpt'),
            'slug' => $this->getTranslations('slug'),
            'category' => $this->category?->name,
            'status' => $this->status,
            'published_at' => $this->published_at ? Carbon::parse($this->published_at)->format('M, d Y') : null,
            'cover_image' => $coverImage ? [
                'id' => $coverImage->id,
                'url' => $coverImage->getUrl(),
                'thumb' => $coverImage->getUrl('thumb'),
            ] : null,
            'created_at' => Carbon::parse($this->created_at)->format('M, d Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('M, d Y'),
        ];
    }
}
