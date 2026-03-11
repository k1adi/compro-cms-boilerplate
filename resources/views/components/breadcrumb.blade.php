@props(['items' => []])

<nav class="flex items-center space-x-2 text-sm text-gray-600" aria-label="Breadcrumb">
    <a href="{{ route('home') }}" class="hover:text-primary">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
    </a>

    @foreach($items as $item)
        <span>/</span>
        @if($loop->last)
            <span class="text-gray-900 font-medium">{{ $item['label'] }}</span>
        @else
            <a href="{{ $item['url'] }}" class="hover:text-primary">{{ $item['label'] }}</a>
        @endif
    @endforeach
</nav>