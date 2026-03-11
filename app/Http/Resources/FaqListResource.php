<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaqListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'question' => $this->getTranslations('question'), // Return all translations
            'answer' => $this->getTranslations('answer'),
            'category' => $this->category,
            'created_at' => Carbon::parse($this->created_at)->format('M, d Y'),
            'updated_at' => Carbon::parse($this->updated_at)->format('M, d Y'),
        ];
    }
}
