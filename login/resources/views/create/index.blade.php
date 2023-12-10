<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Your head content here -->
</head>

<body>
    <a href="{{ route('create.create') }}"><button type="button">Tambah user</button></a>
    <table>
        <thead>
            <tr>
                <th scope="col">Role</th>
                <th scope="col">Nama</th>
                <th scope="col">Username</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($createUsers as $createUser)
                <tr>
                    <td>{{ $createUser->role }}</td>
                    <td>{{ $createUser->name }}</td>
                    <td>{{ $createUser->username }}</td>
                    <td>
                        <div class="d-flex">
                            {{-- Trigger modal --}}
                            <a href="{{ route('create.edit', $createUser->id) }}">edit
                                <!-- Edit icon -->
                            </a>

                            {{-- <button type="button" class="border-0" data-bs-toggle="modal"
                                data-bs-target="#deleteUserModal_{{ $createUser->id }}">
                                <!-- Delete icon -->
                            </button> --}}

                            <form method="POST" action="{{ route('create.destroy', $createUser->id) }}">
                                @csrf
                                @method('DELETE') <!-- Use 'DELETE' method here -->
                                <button type="submit">Delete</button>
                            </form>

                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">No users found.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>

</html>
