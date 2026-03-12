<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleDetailResource;
use App\Http\Resources\ArticleListResource;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use App\Services\ArticleService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    private ArticleService $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $search = $request->get('search', '');
        $status = $request->get('status', 'all');

        $articles = Article::when($search, function ($query) use ($search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            })
            ->when($status !== 'all', function ($query) use ($status) {
                return $query->where('status', $status);
            })
            ->with('category', 'media')
            ->latest()
            ->paginate(15);

        return Inertia::render('Article/Index', [
            'articles' => ArticleListResource::collection($articles),
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = Category::all(['id', 'name']);
        $tags = Tag::all(['id', 'name']);

        return Inertia::render('Article/Create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $coverFile = $request->file('cover');

            $this->articleService->createArticle($validated, $coverFile);

            DB::commit();

            return redirect()
                ->route('cms.articles.index')
                ->with('toast-success', 'Article created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article): Response
    {
        $categories = Category::all(['id', 'name']);
        $tags = Tag::all(['id', 'name']);
        $coverImage = $article->getFirstMedia('cover');
        $articleData = new ArticleDetailResource($article);

        return Inertia::render('Article/Edit', [
            'articleData' => $articleData,
            'article' => $article,
            'categories' => $categories,
            'tags' => $tags,
            'coverImage' => $coverImage ? [
                'id' => $coverImage->id,
                'url' => $coverImage->getUrl(),
                'thumb' => $coverImage->getUrl('thumb'),

            ]: null,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, Article $article): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $coverFile = $request->file('cover');

            $this->articleService->updateArticle($article, $validated, $coverFile);

            DB::commit();

            return redirect()
                ->route('cms.articles.index')
                ->with('toast-success', 'Article updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article): RedirectResponse
    {
        try {
            $this->articleService->deleteArticle($article);

            return redirect()
                ->route('cms.articles.index')
                ->with('toast-success', 'Article deleted successfully.');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
