<!DOCTYPE html>
<html>

<head>
    <title>Delete Folder</title>
</head>

<body>
    <h1>Delete Folder</h1>

    <h2>Are you sure you want to delete the folder "{{ $folder->name }}"?</h2>

    <form action="{{ url('/folders', $folder->id) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Delete</button>
        <a href="{{ url('/folders') }}">Cancel</a>
    </form>
</body>

</html>
