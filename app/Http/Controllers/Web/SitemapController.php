<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\SitemapService;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(SitemapService $sitemapService): Response
    {
        $locales = ['en', 'id'];

        foreach ($locales as $locale) {
            $sitemapService->addUrl(
                route('home', ['locale' => $locale]),
                now()->toAtomString(),
                'monthly',
                '1.0'
            );
        }

        $xml = $sitemapService->generateXml();

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
