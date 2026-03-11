<!-- Hero Section -->
<section id="home" class="hero-banner" style="padding-top: var(--header-height, 80px);">
    <!-- Background Image and Overlay -->
    <div class="absolute inset-0 z-0">
        {{-- <img src="{{ asset('img/home-banner.webp') }}" alt="Hero Banner" class="w-full h-full object-cover"> --}}
        <div class="hero-banner__overlay"></div>
    </div>
    
    <div class="hero-banner__content">
        <h1 class="hero-banner__heading"> Lorem Ipsum </h1>
        <p class="hero-banner__sub-heading">
            Lorem ipsum dolor sit amet consectetur. Eget aenean neque in euismod eget.
        </p>
        <a href="#" rel="nofollow noopener" target="_blank" class="hero-banner__button">
            Contact Us
        </a>
    </div>
    
    <!-- Scroll Down Indicator -->
    <div class="hero-banner__animation">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    </div>
</section>