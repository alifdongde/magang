<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class CreateUserController extends Controller
{
    public function index(Request $request){
        $createUsers = User::all();
//        return view('create.index',compact('createUsers'));
        return response()->json([
            'message' => 'menampilkan  User',
            'data' => $createUsers
        ]);

    }

    public function edit($id)
    {
        return view('create.edit',
        [
            'user'  => User::find($id),
        ]);

    }

    //update user
    public function update(Request $request, $id)
    {

        $this->validate($request,[
            'role' =>'nullable',
            'name' => 'nullable|max:255',
            'username' => 'nullable|max:255',
            // 'email' => 'required|email:dns',
        ]);
        $uprole = User::find($id);
        $uprole->role = $request->role;
        $uprole->name = $request->name;
        $uprole->username = $request->username;
        // $uprole->name = $request->name;
        // $uprole->email = $request->email;
        $uprole->save();
        return response()->json([
           'message'=>'Data Anda Berhasil Di Update',
           'Success'=>true,
        ]);
//        return redirect('/create');
    }


    //create user
    public function create(){
        return view ('create.create');
    }
    public function store(Request $request)
    {

        $validateData = $request->validate([
            'name' => 'required|max:255',
            'username' => 'required',
            'password' => 'required|min:8|max:255',
            'role'      => 'required'

        ]);


        $validateData['password'] = bcrypt($validateData['password']);

        User::create($validateData);
//        $request->session()->flash('success','Registrasi berhasil');
        return response()->json([
            'Message'=> 'Registration User Successfully',
            'Success' => true,
        ]);

//        return redirect('/create');
    }

    //deleted user
    public function destroy($id){

        $delete = User::find($id);
        $delete->delete();
        return response()->json([
           'message'=> 'User Successfully Deleted',
        ],200);
//        return redirect()->back();
    }
}
