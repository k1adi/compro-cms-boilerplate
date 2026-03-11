# Laravel CMS Boilerplate - Complete Documentation

This documentation covers the complete setup and architecture of the CMS boilerplate built with Laravel 10, Inertia React, and Tailwind CSS.

---

## Section 1: Laravel Installation with Breeze and Inertia React

### 1.1 Initial Setup

#### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- MySQL 5.7+

#### Installation Steps

```bash
# 1. Create a new Laravel project
composer create-project laravel/laravel compro-cms-boilerplate

# 2. Navigate to project directory
cd compro-cms-boilerplate

# 3. Install Laravel Breeze with Inertia React
composer require laravel/breeze --dev
php artisan breeze:install

# When prompted, select:
# - Stack: Inertia
# - TypeScript: No
# - ESLint: No
# - Dark mode: No (or Yes, based on preference)

# 4. Install Node dependencies
npm install

# 5. Generate application key
php artisan key:generate
```

### 1.2 Environment Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
php artisan key:generate
```

**Key Environment Variables:**
```env
APP_NAME="CMS Boilerplate"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=compro_cms
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

### 1.3 Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE compro_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed
```

### 1.4 Key Dependencies Installed

**Backend (PHP/Composer):**
- `laravel/framework: ^10.0` - Core framework
- `laravel/breeze: ^1.29` - Authentication scaffolding
- `inertiajs/inertia-laravel: ^0.6.3` - Inertia adapter for Laravel
- `laravel/sanctum: ^3.2` - API authentication
- `tightenco/ziggy: ^2.0` - Route helper for JavaScript
- `guzzlehttp/guzzle: ^7.2` - HTTP client

**Frontend (Node/npm):**
- `react: ^18.2.0` - UI library
- `@inertiajs/react: ^1.0.0` - Inertia React adapter
- `tailwindcss: ^3.2.1` - Utility-first CSS framework
- `@tailwindcss/forms: ^0.5.3` - Form styling plugin
- `@headlessui/react: ^1.4.2` - Headless UI components
- `vite: ^7.3.1` - Build tool
- `laravel-vite-plugin: ^2.1.0` - Vite plugin for Laravel

### 1.5 Project Structure

```
compro-cms-boilerplate/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # CMS admin controllers
│   │   │   ├── Auth/           # Authentication controllers (from Breeze)
│   │   │   └── Web/            # Public website controllers
│   │   ├── Middleware/         # Custom middleware
│   │   ├── Requests/           # Form request validation
│   │   └── Kernel.php
│   ├── Models/                 # Eloquent models
│   ├── Helper/                 # Custom helper functions
│   └── Providers/              # Service providers
├── config/                     # Configuration files
├── database/
│   ├── migrations/             # Database migrations
│   ├── seeders/                # Database seeders
│   └── factories/              # Model factories
├── resources/
│   ├── js/
│   │   ├── Components/         # Reusable React components
│   │   ├── Context/            # React context providers
│   │   ├── Hook/               # Custom React hooks
│   │   ├── app.jsx             # Main app entry
│   │   └── bootstrap.js        # Bootstrap configuration
│   ├── css/                    # Tailwind CSS files
│   └── lang/                   # Translation files (en, id)
├── routes/
│   ├── web.php                 # Web routes
│   ├── auth.php                # Auth routes
│   └── api.php                 # API routes
├── storage/                    # File storage
├── public/                     # Public assets
├── tests/                      # Test files
├── composer.json               # PHP dependencies
├── package.json                # Node dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

### 1.6 Running the Application

**Development:**
```bash
# Terminal 1: Start Laravel development server
php artisan serve

# Terminal 2: Start Vite dev server
npm run dev
```

Access the application at `http://localhost:8000`

**Production Build:**
```bash
npm run build
```

---

## Section 2: SEO Implementation and Multi-Language Support

### 2.1 SEO Implementation with Artesaos/SEOTools

#### Installation

The package `artesaos/seotools: ^1.3` is already included in `composer.json`.

#### Configuration

**Registered Facades** (in `config/app.php`):
```php
'aliases' => [
    'SEOMeta'       => Artesaos\SEOTools\Facades\SEOMeta::class,
    'OpenGraph'     => Artesaos\SEOTools\Facades\OpenGraph::class,
    'Twitter'       => Artesaos\SEOTools\Facades\TwitterCard::class,
    'JsonLd'        => Artesaos\SEOTools\Facades\JsonLd::class,
    'JsonLdMulti'   => Artesaos\SEOTools\Facades\JsonLdMulti::class,
]
```

#### SEO Helper Functions

Located in `app/Helper/SeoHelper.php`, three main functions are available:

**1. setDefaultSEO() - Set default site-wide SEO**
```php
setDefaultSEO();
// Sets:
// - Title: App name
// - Description: Your company description
// - Canonical URL: Current URL
// - Open Graph tags
// - Twitter Card tags
// - JSON-LD structured data
```

**2. setPageSEO($title, $description, $image = null) - Set page-specific SEO**
```php
setPageSEO(
    'Page Title',
    'Page description for search engines',
    asset('images/page-image.jpg')
);
```

**3. setArticleSEO($title, $description, $image, $author, $publishedDate) - Set article SEO**
```php
setArticleSEO(
    'Article Title',
    'Article description',
    asset('images/article-cover.jpg'),
    'Author Name',
    now()->toIso8601String()
);
```

#### Usage in Controllers

```php
<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        setDefaultSEO();
        
        return Inertia::render('Home');
    }
}
```

#### SEO Meta Tags in Blade Template

In `resources/views/app.blade.php`:
```blade
<head>
    {!! SEOMeta::generate() !!}
    {!! OpenGraph::generate() !!}
    {!! Twitter::generate() !!}
    {!! JsonLd::generate() !!}
</head>
```

### 2.2 Multi-Language Support with Spatie/Translatable

#### Installation

The package `spatie/laravel-translatable: ^6.11` is already included.

#### Configuration

**Application Locale** (in `config/app.php`):
```php
'locale' => 'id',              // Default locale
'fallback_locale' => 'en',     // Fallback when translation missing
'faker_locale' => 'en_US',     // For seeding
```

#### SetLocale Middleware

**Location:** `app/Http/Middleware/SetLocale.php`

**Supported Locales:** `en`, `id`

**Features:**
- Validates locale from URL segment
- Stores locale in session
- Respects browser Accept-Language header
- Excludes admin/cms paths from locale routing

**Usage in Routes:**
```php
// Public routes with locale prefix
Route::group(
    ['prefix' => '{locale}', 'middleware' => 'setlocale', 'where' => ['locale' => 'en|id']],
    function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
    }
);
```

#### Making Models Translatable

**Example - Article Model:**
```php
<?php
namespace App\Models;

use Spatie\Translatable\HasTranslations;

class Article extends Model
{
    use HasTranslations;

    protected $fillable = ['category_id', 'title', 'slug', 'excerpt', 'content', 'status'];
    public $translatable = ['title', 'slug', 'excerpt', 'content'];
}
```

**Database Migration:**
```php
Schema::create('articles', function (Blueprint $table) {
    $table->id();
    $table->json('title');      // Stores: {"en": "...", "id": "..."}
    $table->json('slug');
    $table->json('excerpt');
    $table->json('content');
    $table->timestamps();
});
```

#### Accessing Translations

```php
$article = Article::find(1);

// Get current locale translation
echo $article->title;  // Uses app()->getLocale()

// Get specific locale translation
echo $article->getTranslation('title', 'en');

// Set translation
$article->setTranslation('title', 'en', 'English Title');
$article->setTranslation('title', 'id', 'Judul Indonesia');
$article->save();

// Get all translations
$article->getTranslations('title');  // Returns: ['en' => '...', 'id' => '...']
```

#### Language Files

Located in `resources/lang/`:
```
resources/lang/
├── en/
│   └── messages.php
└── id/
    └── messages.php
```

**Usage in Blade/React:**
```php
// In Blade
__('messages.welcome')

// In React (via Inertia props)
// Pass translations from controller to component
```

#### Switching Locale at Runtime

```php
// In middleware or controller
App::setLocale('id');
Session::put('locale', 'id');
```

---

## Section 3: Building the CMS

### 3.1 CMS Architecture Overview

The CMS is built with a modular structure separating concerns:

**Layers:**
1. **Routes** (`routes/web.php`) - Define endpoints
2. **Controllers** (`app/Http/Controllers/Admin/`) - Handle requests
3. **Models** (`app/Models/`) - Database interactions
4. **Migrations** (`database/migrations/`) - Schema definitions
5. **Views** (`resources/js/Pages/`) - React components

### 3.2 Database Schema

#### Categories Table
```php
// Migration: 2026_03_10_041948_create_categories_table.php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->json('name');  // Translatable: {"en": "...", "id": "..."}
    $table->timestamps();
});
```

**Model:** `app/Models/Category.php`
```php
class Category extends Model
{
    use HasTranslations;
    
    protected $fillable = ['name'];
    public $translatable = ['name'];
    
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
```

#### Tags Table
```php
// Migration: 2026_03_10_042000_create_tags_table.php
Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->json('name');
    $table->timestamps();
});
```

#### Articles Table
```php
// Migration: 2026_03_10_055118_create_articles_table.php
Schema::create('articles', function (Blueprint $table) {
    $table->id();
    $table->foreignId('category_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();
    $table->json('title');
    $table->json('slug');
    $table->json('excerpt');
    $table->json('content');
    $table->enum('status', ['draft', 'published'])->default('draft');
    $table->timestamp('published_at')->nullable();
    $table->timestamps();
});
```

**Model:** `app/Models/Article.php`
```php
class Article extends Model implements HasMedia
{
    use HasTranslations, InteractsWithMedia;

    protected $fillable = [
        'category_id', 'title', 'slug', 'excerpt', 'content', 'status', 'published_at'
    ];
    public $translatable = ['title', 'slug', 'excerpt', 'content'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(480)
            ->height(320)
            ->sharpen(10)
            ->performOnCollections('cover');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'article_tag', 'article_id', 'tag_id');
    }
}
```

#### Article Tags Junction Table
```php
// Migration: 2026_03_10_061938_create_article_tags_table.php
Schema::create('article_tag', function (Blueprint $table) {
    $table->id();
    $table->foreignId('article_id')->constrained()->cascadeOnDelete();
    $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
    $table->timestamps();
});
```

#### FAQs Table
```php
// Migration: 2026_03_10_061954_create_faqs_table.php
Schema::create('faqs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('category_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();
    $table->json('question');
    $table->json('answer');
    $table->timestamps();
});
```

**Model:** `app/Models/FAQ.php`
```php
class FAQ extends Model
{
    use HasTranslations;
    
    protected $table = 'faqs';
    protected $fillable = ['category_id', 'question', 'answer'];
    public $translatable = ['question', 'answer'];
    
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
```

#### Media Table (Spatie MediaLibrary)
```php
// Migration: 2026_03_10_062412_create_media_table.php
// Automatically created by spatie/laravel-medialibrary
// Stores file metadata, conversions, and relationships
```

### 3.3 CMS Routes

**Location:** `routes/web.php`

```php
// Root redirect to default locale
Route::get('/', function () {
    return redirect('/id');
});

// Sitemap (non-localized)
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Admin CMS routes (requires authentication)
Route::middleware(['auth'])
    ->prefix('cms')   
    ->name('cms.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('categories', CategoryController::class)->except(['destroy']);
        Route::delete('/delete-category/{category}', [CategoryController::class, 'categoryDestroy'])->name('del-category.destroy');
        Route::delete('/delete-tag/{tag}', [CategoryController::class, 'tagDestroy'])->name('del-tag.destroy');
        Route::resource('articles', ArticleController::class);
        Route::resource('faqs', FaqController::class);
        Route::get('/faqs/{category}', [FaqController::class, 'category'])->name('faqs.category');
    });

// Public routes with locale
Route::group(
    ['prefix' => '{locale}', 'middleware' => 'setlocale', 'where' => ['locale' => 'en|id']],
    function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
    }
);
```

### 3.4 Controllers Structure

#### Admin Controllers Location
`app/Http/Controllers/Admin/`

**DashboardController:**
```php
class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }
}
```

**ArticleController:**
- `index()` - List all articles
- `create()` - Show create form
- `store()` - Save new article
- `show()` - Display single article
- `edit()` - Show edit form
- `update()` - Update article
- `destroy()` - Delete article

**CategoryController:**
- `index()` - List categories
- `create()` - Show create form
- `store()` - Save category
- `edit()` - Edit category
- `update()` - Update category
- `categoryDestroy()` - Custom delete with custom route
- `tagDestroy()` - Delete tags

**FaqController:**
- `index()` - List FAQs
- `create()` - Show create form
- `store()` - Save FAQ
- `category()` - Get FAQs by category
- `edit()` - Edit FAQ
- `update()` - Update FAQ
- `destroy()` - Delete FAQ

### 3.5 Authentication & Authorization

**Authentication Setup:**
- Breeze provides scaffolded auth controllers in `app/Http/Controllers/Auth/`
- Uses Laravel Sanctum for session-based authentication
- Session driver: file (configured in `config/session.php`)

**Auth Routes** (`routes/auth.php`):
- `GET /register` - Registration form
- `POST /register` - Store new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `POST /logout` - Logout user
- `GET /forgot-password` - Password reset request
- `POST /forgot-password` - Send reset link
- `GET /reset-password/{token}` - Reset form
- `POST /reset-password` - Update password

**Middleware Protection:**
```php
// Protect CMS routes
Route::middleware(['auth'])->group(function () {
    // CMS routes here
});

// Protect from authenticated users
Route::middleware(['guest'])->group(function () {
    // Auth routes here
});
```

### 3.6 Inertia & React Integration

#### HandleInertiaRequests Middleware

**Location:** `app/Http/Middleware/HandleInertiaRequests.php`

**Shared Props:**
```php
return [
    'auth' => [
        'user' => $request->user(),  // Current authenticated user
    ],
    'flash' => [
        'alert-success' => $request->session()->get('alert-success'),
        'alert-error' => $request->session()->get('alert-error'),
        'toast-success' => $request->session()->get('toast-success'),
        'toast-error' => $request->session()->get('toast-error'),
    ],
    'appVersion' => $appVersion,  // From version.json
];
```

#### Rendering Views from Controllers

```php
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Article/Index', [
            'articles' => Article::all(),
        ]);
    }
}
```

#### React Components Structure

**Location:** `resources/js/Components/`

**Available Components:**
- `Button/` - Button variants
- `Form/` - Form inputs, selects, textareas
- `Modal/` - Modal dialogs
- `Table/` - Data tables
- `Sidebar/` - Navigation sidebar
- `Header/` - Header component
- `Footer/` - Footer component
- `Pagination/` - Pagination controls
- `Notification/` - Toast notifications
- `Loader/` - Loading spinners
- `Breadcrumb/` - Breadcrumb navigation

**Example Component Usage:**
```jsx
import { useState } from 'react';
import Button from '@/Components/Button/Button';
import Input from '@/Components/Form/Input';

export default function ArticleForm() {
    const [title, setTitle] = useState('');

    return (
        <div>
            <Input 
                label="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button>Save</Button>
        </div>
    );
}
```

### 3.7 File Management with Spatie MediaLibrary

**Installation:** `spatie/laravel-medialibrary: ^10.15`

**Setup in Model:**
```php
class Article extends Model implements HasMedia
{
    use InteractsWithMedia;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover')->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(480)
            ->height(320)
            ->sharpen(10)
            ->performOnCollections('cover');
    }
}
```

**Usage:**
```php
// Upload file
$article->addMediaFromRequest('cover')
    ->toMediaCollection('cover');

// Get file URL
$article->getFirstMediaUrl('cover');  // Original
$article->getFirstMediaUrl('cover', 'thumb');  // Thumbnail

// Delete file
$article->clearMediaCollection('cover');
```

### 3.8 Frontend Dependencies

**UI & Styling:**
- `tailwindcss: ^3.2.1` - Utility CSS framework
- `@tailwindcss/forms: ^0.5.3` - Form styling
- `@headlessui/react: ^1.4.2` - Headless components
- `lucide-react: ^0.459.0` - Icon library

**Form & Data:**
- `react-select: ^5.8.3` - Select dropdown
- `react-flatpickr: ^3.10.13` - Date picker
- `react-quill: ^2.0.0` - Rich text editor
- `date-fns: ^4.1.0` - Date utilities

**Notifications:**
- `react-toastify: ^10.0.6` - Toast notifications
- `sweetalert2: ^11.6.13` - Alert dialogs
- `sweetalert2-react-content: ^5.0.7` - SweetAlert2 React wrapper

**Utilities:**
- `axios: ^1.1.2` - HTTP client
- `clsx: ^2.1.1` - Class name utility
- `alpinejs: ^3.15.4` - Lightweight JS framework

### 3.9 Build & Deployment

**Development:**
```bash
npm run dev
php artisan serve
```

**Production Build:**
```bash
npm run build
php artisan optimize
```

**Vite Configuration** (`vite.config.js`):
- Uses Laravel Vite Plugin
- Handles React JSX transformation
- Automatic asset versioning

**Storage Link:**
```bash
php artisan storage:link
# Creates symlink: public/storage -> storage/app/public
```

### 3.10 Best Practices Implemented

1. **Separation of Concerns:**
   - Controllers handle requests only
   - Models handle data logic
   - Middleware handles cross-cutting concerns

2. **Translatable Content:**
   - All user-facing text stored as JSON in database
   - Automatic locale switching via middleware
   - Fallback to default locale when translation missing

3. **SEO Optimization:**
   - Meta tags for all pages
   - Structured data (JSON-LD)
   - Sitemap generation
   - Canonical URLs

4. **Media Management:**
   - Centralized file handling via MediaLibrary
   - Automatic image conversions
   - Organized storage structure

5. **Authentication:**
   - Built-in with Breeze
   - Session-based for web
   - Sanctum for API (if needed)

6. **Frontend Components:**
   - Reusable React components
   - Tailwind utility classes
   - Responsive design

---

## Quick Start Commands

```bash
# Setup
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate

# Development
php artisan serve        # Terminal 1
npm run dev             # Terminal 2

# Production
npm run build
php artisan optimize

# Database
php artisan migrate:fresh --seed
php artisan storage:link
```

---

## Configuration Files Summary

| File | Purpose |
|------|---------|
| `config/app.php` | App name, locale, timezone, service providers |
| `config/auth.php` | Authentication guards and providers |
| `config/database.php` | Database connections (MySQL, PostgreSQL, etc.) |
| `config/filesystems.php` | Storage disk configuration |
| `config/session.php` | Session driver and settings |
| `config/cache.php` | Cache driver configuration |
| `config/mail.php` | Email configuration |
| `config/queue.php` | Job queue configuration |

---

## Troubleshooting

**Issue: Locale not switching**
- Check `SetLocale` middleware is registered in `app/Http/Kernel.php`
- Verify URL format: `/en/` or `/id/`

**Issue: Images not uploading**
- Run `php artisan storage:link`
- Check file permissions on `storage/app/public`

**Issue: Translations not showing**
- Verify model uses `HasTranslations` trait
- Check `$translatable` property is set
- Ensure JSON columns in migration

**Issue: Vite assets not loading**
- Run `npm run build` for production
- Check `APP_URL` in `.env`

---

**Last Updated:** March 11, 2026
**Version:** 1.0.0
