<!DOCTYPE html>
<html>

<head>
    <title>Folder Files</title>
</head>

<body>
    <h1>Files in {{ $folder->name }}</h1>

    <h2>Upload File</h2>
    <form method="POST" action="{{ route('uploadFile', ['folderId' => $folder->id]) }}" enctype="multipart/form-data">

        @csrf
        <input type="file" name="file" accept=".pdf, .jpg, .png, .jpeg">
        <div class="form-group">
            <label for="access_type">Access Type</label>
            <select class="form-control" id="access_type" name="access_type" required>
                <option value="user">User</option>
                <option value="user1">User1</option>
            </select>
        </div>
        <button type="submit">Upload File</button>
    </form>

@foreach ($files as $file)
    <tr>
        <td>{{ $file->name }}</td>
        <td>{{ $file->uploaded_by }}</td>
        <td>
            @if ($file->access_type == Auth::user()->role || $file->access_type == 'user,user1')
            <a href="{{ asset('storage/uploads/' . $folder->name . '_' . $folder->tahun . '/' . $file->name) }}"
                target="_blank" class="btn btn-info btn-sm">View</a>
        @else
            <span class="text-danger">You do not have permission to view this file.</span>
        @endif
        <a href="{{ route('deleteFile', ['fileId' => $file->id]) }}"
            onclick="return confirm('Are you sure you want to delete this file?')">Delete</a>
        </td>
    </tr>
@endforeach


    {{-- @if ($files)
        @foreach ($files as $file)
            <li>
                <a href="{{ asset('storage/uploads/' . $folder->id . '/' . $file->name) }}"
                    target="_blank">{{ $file->name }}</a>
                <a href="{{ route('deleteFile', ['fileId' => $file->id]) }}"
                    onclick="return confirm('Are you sure you want to delete this file?')">Delete File</a>
            </li>
        @endforeach
    @else
        <p>No files in this folder.</p>
    @endif --}}
    {{-- @foreach ($uploadedFiles as $uploadedFile) --}}
    {{-- @csrf --}}
    {{-- @if ($uploadedFile->name) --}}
    {{-- <li> --}}
    {{-- <a href="{{ route('showFiles', ['folderId' => $folder->id]) }}">Tampilkan File</a> --}}
    {{-- <a href="{{ asset('storage/uploads/' . $folder->id . '/' . $uploadedFile->name) }}"
                target="_blank">{{ $uploadedFile->name }}</a> --}}
    {{-- <a href="{{ asset('uploads/' . $uploadedFile->name) }}" target="_blank">{{ $uploadedFile->name }}</a> --}}
    {{-- <img src="{{ asset('uploads/' . $uploadedFile->name) }}" alt="Uploaded Image" width="400"> --}}
    {{-- <a href="{{ asset('uploads/' . $uploadedFile->name) }}">aa</a> --}}
    {{-- <a href="{{ route('deleteFile', ['fileId' => $uploadedFile->id]) }}"
                onclick="return confirm('Are you sure you want to delete this file?')">Delete File</a> --}}
    {{-- </li> --}}
    {{-- @endif --}}
    {{-- @else
        <p> Tidak Ada</p>
    @endif --}}
    {{-- @endif --}}
    {{-- @endforeach --}}
    {{-- @endif --}}
    <a href="{{ route('fileManager') }}">Back to Folders</a>
</body>

</html>
