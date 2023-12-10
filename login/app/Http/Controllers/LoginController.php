<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function index ()
    {
        return view ('login.index');
    }


    public function authenticate (Request $request)
    {
    $credentials = $request->validate([
        'username' => 'required',
        'password' => 'required',
    ]);
    if (Auth::attempt($credentials))
    {
//         $request->session()->regenerate();
//             return redirect()->intended('/create');
        $user = User::find(Auth::user()->id);
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);

        }

        $abilities = ($user->role === 'admin') ? ['admin'] : ['user-login'];
        $token =  $user->createToken('login',$abilities)->plainTextToken;
        return response()->json([
//            $token => $user->createToken('login')->plainTextToken,
            'token' => $token,
            'message' => "Data Sudah Masuk",
            'Success' => true,
            'user'=> $user,
            'data'=> $user->role,
            'name'=> $user->name
        ],200);

    }else{

        return response()->json([
            'status' => false,
            'message'=>'username dan password salah'
        ],404);
    }

    }



public function store(Request $request)
{
    $credentials = $request->validate([
        'username' => ['required'],
        'password' => ['required'],
    ]);

     return response()->json([
         'message'=>  'The provided credentials do not match our records.',
     ]);

    // return back()->withErrors([
    //     'username' => 'The provided credentials do not match our records.',
    // ]);
}


    public function logout(Request $request)
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            // Melepaskan token pengguna
            $user->tokens->each(function ($token, $key) {
                $token->delete();
            });
            return response()->json(['message' => 'Logout berhasil'], 200);
        }
        return response()->json(['message' => 'Pengguna tidak ditemukan'], 404);
    }

}
