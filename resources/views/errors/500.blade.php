<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- SEO Meta Tags -->
    {!! SEO::generate() !!}
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">
    
    <!-- Alternate Language Links -->
    <link rel="alternate" hreflang="en" href="{{ str_replace('/' . app()->getLocale(), '/en', url()->current()) }}">
    <link rel="alternate" hreflang="id" href="{{ str_replace('/' . app()->getLocale(), '/id', url()->current()) }}">
    
    <!-- Additional SEO -->
    <meta name="theme-color" content="#AA0066">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    
    <link rel="manifest" href="/site.webmanifest">
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/alpine.js'])
</head>
<body>
    <main class="section__wrapper !h-dvh grid place-items-center">
        <div class="flex flex-col md:flex-row items-center gap-8 px-5">
            <div class="w-full md:full-1/2 order-2 md:order-1">
                <p class="text-sm uppercase tracking-[0.4em] text-primary mb-4">500</p>
                <h1 class="text-4xl mb-2 font-semibold">Oops! Something went wrong.</h1>
                <p class="text-gray-500">We hit an unexpected error on our side. Our team has been notified and is looking into it.</p>
            </div>
            <div class="w-full md:full-1/2 order-1 md:order-2">
                <img src="{{ asset('img/server-error.svg') }}" class="w-full max-w-[400px]" alt="Server error illustration">
            </div>
        </div>
    </main>
</body>
</html>
