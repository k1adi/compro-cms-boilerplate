<?php

namespace App\Services;

use Illuminate\Support\Collection;

class SitemapService
{
    private Collection $urls;

    public function __construct()
    {
        $this->urls = collect();
    }

    public function addUrl(string $loc, ?string $lastmod = null, string $changefreq = 'weekly', string $priority = '0.8'): self
    {
        $this->urls->push([
            'loc' => $loc,
            'lastmod' => $lastmod ?? now()->toAtomString(),
            'changefreq' => $changefreq,
            'priority' => $priority,
        ]);

        return $this;
    }

    public function addUrls(array $urls): self
    {
        foreach ($urls as $url) {
            $this->addUrl(
                $url['loc'],
                $url['lastmod'] ?? null,
                $url['changefreq'] ?? 'weekly',
                $url['priority'] ?? '0.8'
            );
        }

        return $this;
    }

    public function getUrls(): Collection
    {
        return $this->urls;
    }

    public function generateXml(): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

        foreach ($this->urls as $url) {
            $xml .= '  <url>' . PHP_EOL;
            $xml .= '    <loc>' . htmlspecialchars($url['loc'], ENT_XML1, 'UTF-8') . '</loc>' . PHP_EOL;
            $xml .= '    <lastmod>' . $url['lastmod'] . '</lastmod>' . PHP_EOL;
            $xml .= '    <changefreq>' . $url['changefreq'] . '</changefreq>' . PHP_EOL;
            $xml .= '    <priority>' . $url['priority'] . '</priority>' . PHP_EOL;
            $xml .= '  </url>' . PHP_EOL;
        }

        $xml .= '</urlset>';

        return $xml;
    }

    public function clear(): self
    {
        $this->urls = collect();

        return $this;
    }
}
