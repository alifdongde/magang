<!DOCTYPE html>
<html>

<head>
    <title>File Manager</title>
</head>

<body>
    <h1>File Manager</h1>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <h2>Create Folder</h2>
    <form action="{{ route('createFolder') }}" method="post">
        @csrf
        <input type="text" name="folder_name" placeholder="Folder Name">
        <input type="text" name="folder_tahun" placeholder="Folder Tahun">
        <button type="submit">Create Folder</button>
    </form>

    <h2>Folders</h2>
    <ul>
        @foreach ($folders as $folder)
            <li>
                {{ $folder->name }}
                {{-- <form method="POST" action="{{ route('folders.rename-folder', ['folderId' => $folder->id]) }}"> --}}
                <a href="{{ route('deleteFolder', ['id' => $folder->id]) }}">Delete</a>
                <form action="{{ route('renameFolder', ['id' => $folder->id]) }}" method="post">
                    @csrf
                    <input type="text" name="new_folder_name" placeholder="New Name">
                    <button type="submit">Rename</button>
                </form>
                <a href="{{ route('showFiles', ['folderId' => $folder->id]) }}">Show Files</a>
            </li>
        @endforeach
    </ul>
</body>

</html>
