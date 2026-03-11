<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    protected array $supportedLocales = ['en', 'id'];
    protected array $excludedPrefixes = ['admin', 'cms', 'login', 'logout'];

    public function handle(Request $request, Closure $next)
    {
        // Check if the path starts with excluded prefixes
        $firstSegment = $request->segment(1);
        if (in_array($firstSegment, $this->excludedPrefixes)) {
            // Set a default locale for excluded paths or use session if available
            $locale = Session::has('locale') ? Session::get('locale') : 'en';
            App::setLocale($locale);
            return $next($request);
        }

        $locale = $request->segment(1);

        // Validate locale from URL
        if (!in_array($locale, $this->supportedLocales)) {
            $locale = $this->getPreferredLocale($request);
            return redirect()->to("/{$locale}");
        }

        // Set application locale
        App::setLocale($locale);
        Session::put('locale', $locale);

        return $next($request);
    }

    protected function getPreferredLocale(Request $request): string
    {
        // Check session first
        if (Session::has('locale')) {
            $sessionLocale = Session::get('locale');
            if (in_array($sessionLocale, $this->supportedLocales)) {
                return $sessionLocale;
            }
        }

        // Check browser Accept-Language header
        $browserLang = substr($request->server('HTTP_ACCEPT_LANGUAGE') ?? '', 0, 2);
        if (in_array($browserLang, $this->supportedLocales)) {
            return $browserLang;
        }

        // Default to English
        return 'en';
    }
}