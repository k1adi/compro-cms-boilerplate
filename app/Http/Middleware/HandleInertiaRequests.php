<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        $versionFile = public_path('version.json');
        
        if (file_exists($versionFile)) {
            $versionData = json_decode(file_get_contents($versionFile), true);
            return $versionData['version'] ?? parent::version($request);
        }
        
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Get app version from version.json
        $appVersion = null;
        $versionFile = public_path('version.json');
        if (file_exists($versionFile)) {
            $versionData = json_decode(file_get_contents($versionFile), true);
            $appVersion = $versionData['version'] ?? null;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'alert-success' => $request->session()->get('alert-success'),
                'alert-error' => $request->session()->get('alert-error'),
                'toast-success' => $request->session()->get('toast-success'),
                'toast-error' => $request->session()->get('toast-error'),
            ],
            'appVersion' => $appVersion,
        ];
    }
}
