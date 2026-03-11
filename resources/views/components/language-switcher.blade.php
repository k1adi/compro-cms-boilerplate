<div class="relative group" x-data="{ open: false }">
    <!-- Language Button -->
    <button
        @click="open = !open"
        class="flex items-center space-x-2 text-gray-700 hover:text-primary transition"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages-icon lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
        <span class="text-sm font-medium">{{ strtoupper(app()->getLocale()) }}</span>
    </button>

    <!-- Dropdown Menu -->
    <div
        x-show="open"
        @click.outside="open = false"
        x-transition
        class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50"
    >
        <a
            href="{{ str_replace('/' . app()->getLocale(), '/en', request()->getRequestUri()) }}"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:!text-primary first:rounded-t-lg {{ app()->getLocale() === 'en' ? 'bg-primary !text-white' : '' }}"
        >
            {{ __('navigation.english') }}
        </a>
        <a
            href="{{ str_replace('/' . app()->getLocale(), '/id', request()->getRequestUri()) }}"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:!text-primary last:rounded-b-lg {{ app()->getLocale() === 'id' ? 'bg-primary !text-white' : '' }}"
        >
            {{ __('navigation.indonesian') }}
        </a>
    </div>
</div>