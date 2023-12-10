<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;

class GetFolderController extends Controller
{
    public function  index(Request $request)
    {
        $folders = Folder::all();
        return response()->json([
            'message' => 'menampilkan  Folder',
            'data' => $folders,
        ], 200);
    }
}
