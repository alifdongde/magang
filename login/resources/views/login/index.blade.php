<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

</head>

<body>

    <form method="POST" action="/login">
        @csrf
        <label for="">login</label>
        <input type="text" id="username" name="username">
        <label for="">password</label>
        <input type="password" id="password" name="password">
        <button class="btn bg-primary text-white btn-lg px-5" type="submit">Login</button>

    </form>
</body>

</html>
