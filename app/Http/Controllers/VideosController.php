<?php

namespace App\Http\Controllers;

use App\Models\Videos;
use GuzzleHttp\Client;
use Illuminate\Http\Request;


class VideosController extends Controller
{
    public function index()
    {        
        $response = Videos::get();
        return response()->json($response);

    }
}
