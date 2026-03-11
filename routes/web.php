<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\SitemapController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ✅ ROOT → redirect to default locale
Route::get('/', function () {
    return redirect('/id');
});

// ✅ SITEMAP (non-localized)
Route::get('/sitemap.xml', [SitemapController::class, 'index'])
    ->name('sitemap');

// ✅ ADMIN ROUTES (NO LOCALE)
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

// ✅ PUBLIC ROUTES WITH LOCALE
Route::group(
    ['prefix' => '{locale}', 'middleware' => 'setlocale', 'where' => ['locale' => 'en|id']],
    function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');

        // Future public routes:
        // Route::get('/articles', ...);
        // Route::get('/articles/{slug}', ...);
        // Route::get('/faq', ...);
    }
);

require __DIR__.'/auth.php';
