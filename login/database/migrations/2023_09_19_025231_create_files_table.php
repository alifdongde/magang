<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('folder_id');
            $table->string('name');
            $table->integer('max_size')->default(0); // Nilai default diatur ke 0
            $table->string('allowed_mimes')->default(''); // Nilai default diatur ke string kosong
            $table->string('access_type')->default('all'); // Tambahkan kolom 'access_type' dengan nilai default 'all'
            $table->string('uploaded_by')->nullable();
            $table->timestamps();
            $table->foreign('folder_id')->references('id')->on('folders')->onDelete('cascade');

            // $table->foreign('folder_id')->references('id')->on('folders');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
