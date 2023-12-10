<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\File;
use Illuminate\Support\Facades\DB;

class FilterDataController extends Controller
{

    //FIlter Search Folder By Tahun 
    public function index(Request $request)
    {
        $keyword = $request->input('tahun'); // Mendapatkan kata kunci tahun dari request
        // $keywor1 = $request->input('tahun'); // Mendapatkan kata kunci tahun dari request

        // Jika ada kata kunci tahun, lakukan pencarian, jika tidak, ambil semua folder
        $folders = $keyword ? Folder::where('tahun', 'LIKE', '%' . $keyword . '%')
            ->get()
            : Folder::all();


        // Mengembalikan hasil sebagai respons JSON
        return response()->json([
            'message' => 'Menampilkan Folder',
            'data' => $folders,
        ], 200);
    }



    //search folder by name
    public function searchName(Request $request,$tahun)
    {
        $search = $request->input('name');
        try {
            $foldername = Folder::where('tahun',$tahun)
            ->where('name','LIKE',"%$search%")
            ->get();
            return response()->json(['hasil' => $foldername]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // $foldername = $search ? Folder::where('name', 'LIKE', '%' . $search . '%')->get()

    }

    public function getTahunOptions()
    {
        // Mengambil opsi tahun dari data folder yang unik
        $tahunOptions = Folder::distinct()->pluck('tahun')->toArray();

        // Mengembalikan opsi tahun sebagai respons JSON
        return response()->json([
            'message' => 'Mengambil Opsi Tahun',
            'data' => $tahunOptions,
        ], 200);
    }




    //fitur searching untuk Folder
    public function filter(Request $request)
    {
        $filterSearch = $request->input('name');

        // Jika ada kata kunci tahun, lakukan pencarian, jika tidak, ambil semua folder
        $folder = $filterSearch
            ? Folder::where('name', 'LIKE', '%' . $filterSearch . '%')->get()
            : Folder::all();

        // Mengembalikan hasil sebagai respons JSON
        return response()->json([
            'message' => 'Menampilkan File',
            'data' => $folder,
        ], 200);
    }
}
