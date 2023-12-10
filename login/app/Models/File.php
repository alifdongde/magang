<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        'folder_id',
        'name',
        'max_size',
        'allowed_mimes',
        'access_type',
        'uploaded_by',
    ];

    protected $attributes = [
        'max_size' => 0, // Nilai default diatur ke 0
        'allowed_mimes' => '', // Nilai default diatur ke string kosong
    ];

    // Mutator untuk mengatur max_size
    public function setMaxSizeAttribute($value)
    {
        $this->attributes['max_size'] = $value;
    }

    // Mutator untuk mengatur allowed_mimes
    public function setAllowedMimesAttribute($value)
    {
        $this->attributes['allowed_mimes'] = $value;
    }

    // Relasi dengan tabel Folder
    public function folder()
    {
        return $this->belongsTo(Folder::class);
    // return $this->belongsTo(Folder::class)->onDelete('cascade');

    }

//     public function folder()
// {
//     return $this->belongsTo(Folder::class)->onDelete('cascade');
// }
    }
