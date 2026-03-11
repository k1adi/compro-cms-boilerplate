<header class="header" 
        x-data="{ 
            mobileMenuOpen: false,
            isScrolled: false
        }"
        @scroll.window="isScrolled = window.scrollY > 600"
        :class="isScrolled ? 'header--scrolled' : 'header--top'">
    <nav class="navbar">
        <div class="flex items-center justify-between">
            <!-- Logo -->
            <a href="#home">
                <img src="{{ asset('img/dummy-logo.png') }}" class="nav__img" alt="Logo Img">
            </a>
            
            <!-- Desktop Navigation -->
            <div class="nav__desktop">
                <a href="#about">{{ __('navigation.about') }}</a>
                <a href="#facilities">{{ __('navigation.facility') }}</a>
                <a href="#contact">{{ __('navigation.contact') }}</a>
                <!-- Language Switcher -->
                @include('components.language-switcher')
                {{-- <a href="/faq">FAQ</a> --}}
            </div>

            <a href="#" rel="nofollow noopener" target="_blank" class="nav__button--desktop">
                Contact Us
            </a>
            
            <!-- Mobile Menu Button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="nav__toggle-button">
                <svg x-show="!mobileMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <svg x-show="mobileMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
        
        <!-- Mobile Navigation -->
        <div x-show="mobileMenuOpen" 
             x-transition
             class="nav__mobile">
            <a href="#about" @click="mobileMenuOpen = false">{{ __('navigation.about') }}</a>
            <a href="#facilities" @click="mobileMenuOpen = false">{{ __('navigation.facility') }}</a>
            <a href="#contact" @click="mobileMenuOpen = false">{{ __('navigation.contact') }}</a>
            <!-- Language Switcher -->
            @include('components.language-switcher')
            {{-- <a href="/faq" @click="mobileMenuOpen = false">FAQ</a> --}}
            <a href="#" rel="nofollow noopener" target="_blank" class="nav__button--mobile">
                Book Now
            </a>
        </div>
    </nav>
</header>