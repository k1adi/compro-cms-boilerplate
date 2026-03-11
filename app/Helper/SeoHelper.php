<?php 

use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\TwitterCard;
use Artesaos\SEOTools\Facades\JsonLd;

if (!function_exists('setDefaultSEO')) {
    function setDefaultSEO(): void
    {
        SEOMeta::setTitle(config('app.name'));
        SEOMeta::setDescription('Your company description');
        SEOMeta::setCanonical(url()->current());

        OpenGraph::setTitle(config('app.name'));
        OpenGraph::setDescription('Your company description');
        OpenGraph::setUrl(url()->current());
        OpenGraph::addImage(asset('images/og-image.jpg'));

        TwitterCard::setTitle(config('app.name'));
        TwitterCard::setDescription('Your company description');

        JsonLd::setTitle(config('app.name'));
        JsonLd::setDescription('Your company description');
        JsonLd::setType('Organization');
    }
}

if (!function_exists('setPageSEO')) {
    function setPageSEO(string $title, string $description, ?string $image = null): void
    {
        SEOMeta::setTitle($title);
        SEOMeta::setDescription($description);
        SEOMeta::setCanonical(url()->current());

        OpenGraph::setTitle($title);
        OpenGraph::setDescription($description);
        OpenGraph::setUrl(url()->current());
        if ($image) {
            OpenGraph::addImage($image);
        }

        TwitterCard::setTitle($title);
        TwitterCard::setDescription($description);
        if ($image) {
            TwitterCard::setImage($image);
        }

        JsonLd::setTitle($title);
        JsonLd::setDescription($description);
    }
}

if (!function_exists('setArticleSEO')) {
    function setArticleSEO(string $title, string $description, string $image, string $author, string $publishedDate): void
    {
        setPageSEO($title, $description, $image);

        JsonLd::setType('NewsArticle');
        JsonLd::setTitle($title);
        JsonLd::setDescription($description);
        JsonLd::setAuthor($author);
        JsonLd::setDatePublished($publishedDate);
    }
}