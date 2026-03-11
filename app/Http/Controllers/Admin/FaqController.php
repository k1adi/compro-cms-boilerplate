<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FaqRequest;
use App\Http\Resources\FaqListResource;
use App\Models\FAQ;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): RedirectResponse | Response
    {
        $category = $request->get('category', 'all');
        $category = str_replace('-', ' ', $category);

        // Validate category using model method
        if ($category !== 'all' && !FAQ::isValidCategory($category)) {
            return redirect()->route('cms.faqs.index', ['category' => 'all']);
        }

        $faqs = FAQ::when($category !== 'all', function ($query) use ($category) {
                return $query->where('category', 'like', "%{$category}%");
            })
            ->advancedFilter()
            ->paginate(15);

        return Inertia::render('Faq/Index', [
            'faqs' => FaqListResource::collection($faqs),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Faq/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            FAQ::create($validated);
            
            DB::commit();            
            return redirect()
                ->route('cms.faqs.index')
                ->with('toast-success', 'FAQ created successfully.');
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
    public function edit(FAQ $faq): Response
    {
        return Inertia::render('Faq/Edit', [
            'faq' => $faq
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FaqRequest $request, FAQ $faq): RedirectResponse
    {
        try {
            DB::beginTransaction();
            
            $validated = $request->validated();
            $faq->update($validated);
            
            DB::commit();
            
            return redirect()
                ->route('cms.faqs.index')
                ->with('toast-success', 'FAQ updated successfully.');
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
    public function destroy(FAQ $faq): RedirectResponse
    {
        try {
            $faq->delete();
            
            return redirect()
                ->route('cms.faqs.index')
                ->with('toast-success', 'FAQ deleted successfully.');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
