<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryTagRequest;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('Category/Index', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryTagRequest $request): RedirectResponse
    {

        try {
            DB::beginTransaction();
            $type = $request->get('type');
            $validated = $request->all();

            if ($type === 'tag') {
                Tag::create($validated);
            } else {
                Category::create($validated);
            }

            DB::commit();
            return redirect()->route('cms.categories.index')->with('toast-success', ucfirst($type) . ' created successfully.');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryTagRequest $request, string $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $type = $request->get('type');
            $validated = $request->all();

            if ($type === 'tag') {
                $item = Tag::findOrFail($id);
                $item->update($validated);
            } else {
                $item = Category::findOrFail($id);
                $item->update($validated);
            }

            DB::commit();
            return redirect()->route('cms.categories.index')->with('toast-success', ucfirst($type) . ' updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified category from storage.
     */
    public function categoryDestroy(Category $category): RedirectResponse
    {
        try {
            $category->delete();
            
            return redirect()
                ->route('cms.categories.index')
                ->with('toast-success', 'Category deleted successfully.');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
        
    }

    /**
     * Remove the specified tag from storage.
     */
    public function tagDestroy(Tag $tag): RedirectResponse
    {
         try {
            $tag->delete();
            
            return redirect()
                ->route('cms.categories.index')
                ->with('toast-success', 'Tag deleted successfully.');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
