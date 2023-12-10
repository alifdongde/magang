<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Models\User;

class LoginSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //  User::create([
        //      'name' => 'Admin',
        //      'username' => 'admin1',
        //      'password' => Hash::make('admin123'),
        //      'role' => 'admin',
        //  ]);
        User::create([
            'name' => 'Admin2',
            'username' => 'admin2',
            'password' => Hash::make('admin123'),
            'role' => 'user',
        ]);
       
        User::create([
            'name' => 'Admin3',
            'username' => 'admin3',
            'password' => Hash::make('admin123'),
            'role' => 'user1',
        ]);
        User::create([
            'name' => 'Admin4',
            'username' => 'admin4',
            'password' => Hash::make('admin123'),
            'role' => 'user2',
        ]);
        User::create([
            'name' => 'Admin5',
            'username' => 'admin5',
            'password' => Hash::make('admin123'),
            'role' => 'user3',
        ]);
       
   
 
     
        
    }
}
