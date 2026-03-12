<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class ArticleService
{
    /**
     * Create a new article with media handling
     */
    public function createArticle(array $data, ?UploadedFile $coverFile = null): Article
    {
        $article = Article::create($this->prepareArticleData($data));

        if ($coverFile) {
            $this->attachCoverImage($article, $coverFile);
        }

        if (!empty($data['tags'])) {
            $article->tags()->attach($data['tags']);
        }

        return $article;
    }

    /**
     * Update an existing article with media handling
     */
    public function updateArticle(Article $article, array $data, ?UploadedFile $coverFile = null): Article
    {
        $article->update($this->prepareArticleData($data));

        if ($coverFile) {
            $article->clearMediaCollection('cover');
            $this->attachCoverImage($article, $coverFile);
        }

        if (isset($data['tags'])) {
            $article->tags()->sync($data['tags']);
        }

        return $article;
    }

    /**
     * Prepare article data for storage
     */
    private function prepareArticleData(array $data): array
    {
        return [
            'category_id' => $data['category'],
            'title' => [
                'en' => $data['title']['en'] ?? '',
                'id' => $data['title']['id'] ?? '',
            ],
            'slug' => [
                'en' => $data['slug']['en'] ?? '',
                'id' => $data['slug']['id'] ?? '',
            ],
            'excerpt' => [
                'en' => $data['excerpt']['en'] ?? '',
                'id' => $data['excerpt']['id'] ?? '',
            ],
            'content' => [
                'en' => $data['content']['en'] ?? '',
                'id' => $data['content']['id'] ?? '',
            ],
            'status' => $data['status'] ?? 'draft',
            'published_at' => $data['published_at'] ?? null,
        ];
    }

    /**
     * Attach cover image to article with conversions
     */
    private function attachCoverImage(Article $article, UploadedFile $file): void
    {
        try {
            $article
                ->addMedia($file)
                ->withResponsiveImages()
                ->toMediaCollection('cover');
        } catch (FileDoesNotExist | FileIsTooBig $e) {
            throw new \Exception('Failed to upload cover image: ' . $e->getMessage());
        }
    }

    /**
     * Delete article with all associated media
     */
    public function deleteArticle(Article $article): bool
    {
        $article->clearMediaCollection('cover');
        return $article->delete();
    }

    /**
     * Get article with media information
     */
    public function getArticleWithMedia(Article $article): Article
    {
        return $article->load('media');
    }
}
