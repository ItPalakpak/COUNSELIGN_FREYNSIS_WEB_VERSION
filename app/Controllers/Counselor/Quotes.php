<?php

namespace App\Controllers\Counselor;

use App\Controllers\BaseController;
use App\Models\QuoteModel;
use App\Helpers\TimezoneHelper;

class Quotes extends BaseController
{
    /**
     * Display the quotes management page
     */
    public function index()
    {
        // Check if user is logged in and is a counselor
        if (!session()->get('logged_in') || session()->get('role') !== 'counselor') {
            return redirect()->to('/');
        }

        $data = [
            'title' => 'Quotes - Counselign',
            'username' => session()->get('username'),
            'email' => session()->get('email')
        ];

        return view('counselor/quotes', $data);
    }
}

