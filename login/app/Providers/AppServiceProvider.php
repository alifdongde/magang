<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\User;
Use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    // public function boot(): void
    // {
    //     //
    // }
    public function boot()
    {
        Gate::define('admin',function(User $user){
            return $user->role === 'admin';
        });
        Gate::define('user',function(User $user){
            return $user->role === 'user';
        });
        Gate::define('user1',function(User $user){
            return $user->role === 'user1';
        });
    }
}
