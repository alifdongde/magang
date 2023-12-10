<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CekRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,$roles): Response
    {
    //     if (auth()->check() && auth()->user()->role === 'admin') {
    //         return $next($request);
    //     }
    
    //     return redirect('/');
        
    //     if (auth()->check() && auth()->user()->role === 'user1,user') {
    //         return $next($request);
    //     }
    
    //     return redirect('/create');
    // }
    if (!Auth::check()) {
        return redirect('/login');
    }

    // Memeriksa apakah role pengguna sesuai dengan yang diberikan dalam parameter middleware
    if (Auth::user()->role != $roles) {
        return redirect('/folder');
        // return abort(403, 'Akses Ditolak');
    }

    return $next($request);
}
}
