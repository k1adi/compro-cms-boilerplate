<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        setPageSEO(
            __('page.home-title'),
            __('page.home-desc'),
            asset('img/about-us.webp')
        );

        return view('pages.home');
    }
}
