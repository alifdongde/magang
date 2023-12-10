<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\CreateUserController;
use App\Http\Controllers\FilterDataController;

//create user oleh admin
Route::group(['middleware' => ['auth:sanctum','cekrole:admin','ability:admin']],function(){
    //create update deleted user
    Route::resource('/create/create', CreateUserController::class);
    Route::resource('/create/create', CreateUserController::class);
    Route::resource('/create/create',CreateUserController::class);

});

//login user dan admin
Route::get('/login', [LoginController::class,'index'])->name('login');
Route::post('/login', [LoginController::class,'authenticate']);
Route::post('/logout', [LoginController::class,'logout']);
//Route::get('/me',[\App\Http\Controllers\GetUserController::class,'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/me',[CreateUserController::class,'index']);
Route::get('/view',[FilterDataController::class,'index']);
Route::get('/tahun-options', [FilterDataController::class, 'getTahunOptions']);
Route::get('/folder-options',[FilterDataController::class,'filter']);
Route::get('/{tahun}/search',[FilterDataController::class,'searchName']);

// Route::get('/get-file',[FilterDataController::class,'getFile']);



//menampilkan semua folder
// Route::group(['middleware' => ['auth:sanctum','cekroles:user,user1,user2,user3','ability:user-login']],function(){
//     // Route::resource('/create', CreateUserController::class);


//    });



//user membuat folder dan menambahkan file
Route::group(['middleware' => ['auth:sanctum','cekroles:user,user1,user2,user3','ability:user-login']],function(){
    
    Route::get('/folder', [FolderController::class, 'index'])->name('fileManager');
    // Route::get('/folder/{folderId}/files', [FolderController::class, 'showFiles'])->name('showFiles');
    Route::post('/folder/showfiles', [FolderController::class, 'showFiles'])->name('showFiles');

    Route::post('/folder/create', [FolderController::class, 'createFolder'])->name('createFolder');
    Route::get('/folder/{id}/delete', [FolderController::class, 'deleteFolder'])->name('deleteFolder');
    Route::post('/folder/{id}/rename', [FolderController::class, 'renameFolder'])->name('renameFolder');
    Route::post('/folder/{folderId}/upload', [FolderController::class, 'uploadFile'])->name('uploadFile');
   // Route::post('/folder/{folderId}/upload', [FolderController::class, 'uploadFile'])->name('uploadFile');
    Route::delete('/file/{fileId}/delete', [FolderController::class, 'deleteFile'])->name('deleteFile');
    
    // Route::get('/folder/{folderId}/files', [FolderController::class, 'getFiles']);
});



