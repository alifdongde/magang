<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <form action="{{ route('create.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <select class="form-select fw-weight-bold text-bold text-center" id="role" name="role"
            value="{{ old('role') }}" aria-label="Floating label select example">
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="user1">User1</option>
        </select>
        <label for="">nama</label>
        <input type="text" id="name" name="name">
        <label for="">username</label>
        <input type="text" id="username" name="username">
        <label for="">password</label>
        <input type="password" id="password" name="password">
        <button type="submit">Simpan</button>
    </form>
</body>

</html>
