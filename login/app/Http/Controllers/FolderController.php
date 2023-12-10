<?php

namespace App\Http\Controllers;
use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use App\Models\User;
use \Illuminate\Validation\Validator;
use \Illuminate\Support\Facades\DB;

class FolderController extends Controller
{
    public function index()
    {
        $folders = Folder::all();

//        return view('folders.index', compact('folders'));
        return response()->json([
          'message' => 'menampilkan  Folder',
           'data' => $folders,
        ],200);
    }





    public function createFolder(Request $request)
    {
        // Validasi dan membuat folder baru di database
        $this->validate($request, [
            'folder_name' => 'required|string|max:255',
//            'folder_tahun' => 'required|integer',
        ]);

        $folder = new Folder();
        $folder->name = $request->input('folder_name');
        $folder->tahun = date("Y");
        $folder->save();

        // Membuat folder baru di penyimpanan (public/storage)
        $folderPath = 'uploads/' . $folder->name . '_' . $folder->tahun;
        Storage::makeDirectory($folderPath);

        return response()->json([
            'message'=>'created successfully folder',
            'data'=>$folder,
        ]);
        return redirect()->back()->with('success', 'Folder created successfully');
    }

    public function renameFolder(Request $request, $id)
{
    $folder = Folder::findOrFail($id);
    $newFolderName = $request->input('new_folder_name');

    // Ambil tahun dari folder yang lama
    $tahun = $folder->tahun;

    // Konstruksi nama folder baru dengan tahun
    $newFolderPath = 'uploads/' . $newFolderName . '_' . $tahun;

    if ($folder->name !== $newFolderName) {
        // Hapus folder lama dari penyimpanan (public/storage)
        $oldFolderPath = 'uploads/' . $folder->name . '_' . $tahun;
        if (Storage::exists($oldFolderPath)) {
            Storage::deleteDirectory($oldFolderPath);
        }

        // Update nama folder di database
        $folder->name = $newFolderName;
        $folder->save();

        // Buat folder baru di penyimpanan (public/storage)
        Storage::makeDirectory($newFolderPath);
    }
    return response()->json([
        'message' => 'folder renamed successfully'
    ]);

    return redirect()->route('fileManager')->with('success', 'Folder renamed successfully');
}

public function deleteFolder($id)
{
    $folder = Folder::findOrFail($id);

    // Temukan dan hapus semua file dalam folder dari penyimpanan (public/storage)
    $folderPath = 'uploads/' . $folder->name . '_' . $folder->tahun;
    if (Storage::exists($folderPath)) {
        $files = Storage::files($folderPath);
        Storage::delete($files);
        Storage::deleteDirectory($folderPath);
    }

    // Hapus folder dari database
    $folder->delete();

//    return redirect()->back()->with('success', 'Folder and its contents deleted successfully');
    return response()->json([
        'message'=> 'Folder and its contents deleted successfully'
    ]);
}

// public function showFiles(Request $request, $folderId) {				
				
// $folder = Folder::findOrFail($folderId);				
				
// $accessType = $request->input('access_type');				
// $uploadBy = $request->input('uploaded_by');				
				
// $files = DB::table('files')				
// ->where('folder_id', $folderId)				
// ->where('uploaded_by', $uploadBy)				
// ->get();				
				
// $files1 = DB::table('files')				
// ->where('folder_id', $folderId)				
// ->where('access_type', $accessType)				
// ->get();				
				
// if( count($files)!=0 and count($files1)!=0){
//     return response()->json([
//         'message' => 'terpenuhi',
//     ]);
// }

// elseif (count($files) !=0)				
// {				
// return response()->json([				
// 'message' => 'file ada.',				
// 'id' => $files->id,				
// 'data' => $files,				
// 'folder' => $folder,				
// 'path' => $this->getFilePath($folder, $files->name),				
// // 'path' => $this->getFilePath($files),				
// ]);				
// }elseif(count($files1)!=0){				
// return response()->json([				
// 'message' => 'file ada juga.',				
// 'id' => $files1->id,				
// 'data' => $files1,				
// 'folder' => $folder,				
// 'path' => $this->getFilePath($folder, $files1->name),				
// // 'path' => $this->getFilePath($files1),				
// ]);				
// }else{				
// return response()->json([				
// 'message' => 'file tidak ada.',				
// 'data' => [],				
// ]);				
// }				
// return response()->json([				
// 'message' => 'access ada',				
// 'data' => $accessType,$uploadBy				
// ]);				
				
				
// }				

public function showFiles(Request $request,)
    {
        $folder  = $request->input('folder');
        $folders = Folder::findOrFail($folder);
        $upload  = $request->input('uploadedBy');
        $access  = $request->input('accessType');
        $search = $request->input('search');

        $files = DB::table('files')
            ->where('folder_id', $folder)
            ->where('name', 'like', "%$search%")
            ->Where('uploaded_by', $upload)
            ->orWhereIn('access_type',[$access,'all'])
            // ->orWhere('access_type','all')
            ->get();


        $files1 = DB::table('files')
            ->where('folder_id', $folder)
            ->where('name', 'like', "%$search%")
            ->orWhere('access_type', $access)
            ->get();

        if (count($files) != 0 and count($files1) != 0) {

            $tampil = DB::table('files')
                ->where('folder_id', $folder)
                ->Where('uploaded_by', $upload)
                ->where('name', 'like', "%$search%")
                ->orWhere('access_type','all')
                ->orWhere('access_type', $access)
                ->get();
            $responseData = array();
            foreach ($tampil as $file) {
                $responseData[] = [
                    'id' => $file->id,
                    'name' => $file->name,
                    'folder_id' => $file->folder_id,
                    'path' => $this->getFilePath($folders, $file->name),
                    // tambahkan kolom lain yang diperlukan
                ];
            }

            return response()->json([
                'message' => 'terpenuhi',
                'data' => $responseData,

            ]);
        } elseif (count($files) != 0) {
            $responseData = array();
            foreach ($files as $file) {
                $responseData[] = [
                    'id' => $file->id,
                    'name' => $file->name,
                    'folder_id' => $file->folder_id,
                    'path' => $this->getFilePath($folders, $file->name),
                    // tambahkan kolom lain yang diperlukan
                ];
            }

            return response()->json([
                'message' => 'terpenuhi2',
                'data' => $responseData,

            ]);
        } elseif (count($files1) != 0) {
            $responseData = array();
            foreach ($files1 as $file) {
                $responseData[] = [
                    'id' => $file->id,
                    'name' => $file->name,
                    'folder_id' => $file->folder_id,
                    'path' => $this->getFilePath($folders, $file->name),
                    // tambahkan kolom lain yang diperlukan
                ];
            }

            return response()->json([
                'message' => 'terpenuhi1',
                'data' => $responseData,

            ]);
        }

        else {
            return response()->json([
                'message' => 'File tidak ada.',
                'data' => [],
            ]);
        }
    }

private function getFilePath($folder, $fileName) {
    return "storage/uploads/{$folder->name}_{$folder->tahun}/{$fileName}";
}

    public function uploadFile(Request $request, $folderId)
    {
        $folder = Folder::findOrFail($folderId);
    
        // Memeriksa apakah ada file yang diunggah
        if ($request->hasFile('file')) {
            // Validasi file
            $this->validate($request, [
                'file' => [
                    'required',
                    'file',
                    'max:2048', // Maksimum 2 MB (2 * 1024 KB)
                    'mimes:pdf,jpg,png', // Hanya izinkan tipe MIME pdf, jpg, dan png
                ],
            ]);
    
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
    
            // Mendapatkan peran pengguna tujuan yang didapat dari input form
            $targetUserRole = $request->input('access_type');
            $userupload = $request->input('uploaded_by');
    
            // Mengatur access_type sesuai dengan peran pengguna
            if ($targetUserRole == 'all') {
                $targetUserRole = 'all';
            }
    
            // Simpan informasi file ke dalam tabel 'files'
            $fileModel = new File();
            $fileModel->folder_id = $folder->id;
            $fileModel->name = $fileName;
            $fileModel->max_size = $file->getSize();
            $fileModel->allowed_mimes = $file->getMimeType();
            $fileModel->access_type = $targetUserRole;
            $fileModel->uploaded_by = $userupload;
            $fileModel->save();
            // $fileModel->uploaded_by = Auth::user()->role;
    
            // Simpan file di dalam folder yang sesuai di penyimpanan (public/storage)
            $file->storeAs('uploads/' . $folder->name . '_' . $folder->tahun, $fileName, 'public');
    
            return response()->json(['message' => 'File uploaded successfully']);
            return redirect()->back();
        } else {
            // Tidak ada file yang diunggah
            return redirect()->back()->with('error', 'No file uploaded');
            
        }
    }

    // public function getFiles($folderId)
    // {
    //     $folder = Folder::findOrFail($folderId);
    
    //     $files = File::where('folder_id', $folderId)->get();
    
    //     $fileUrls = $files->map(function ($file) use ($folder) {
    //         $filePath = "uploads/{$folder->name}_{$folder->tahun}/{$file->name}";
    //         $url = Storage::url($filePath);
    
    //         return [
    //             'name' => $file->name,
    //             'url' => $url,
    //         ];
    //     });
    
    //     return response()->json(['files' => $fileUrls]);
    // }


    public function deleteFile(Request $request, $fileId)
    {
        $file = File::findOrFail($fileId);

        // Hapus file dari penyimpanan (public/storage)
        // Anda mungkin perlu menyesuaikan path sesuai dengan struktur folder di penyimpanan Anda
        if ($file->name && $file->folder) {
            $folderPath = 'uploads/' . $file->folder->name . '_' . $file->folder->tahun;
            $filePath = $folderPath . '/' . $file->name;
            Storage::delete($filePath);
        }

        // Hapus catatan file dari database
        $file->delete();

        return response()->json([
            'Message' => 'Success, file deleted successfully',
            'data' => $file
        ]);
    }

}