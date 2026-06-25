import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then(res => setUsers(res.data));
  }, []);

  const deleteUser = async (id) => {

    const ok = window.confirm(
      "Delete this user?"
    );

    if (!ok) return;

    await API.delete(`/admin/users/${id}`);

    setUsers(prev =>
      prev.filter(u => u._id !== id)
    );
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Users
      </h1>

      <div className="space-y-4">

        {users.map(u => (
          <div
            key={u._id}
            className="bg-white p-6 rounded-2xl shadow flex justify-between"
          >
            <div>
              <h2 className="font-bold">
                {u.name}
              </h2>

              <p>{u.email}</p>

              <p className="text-sm text-gray-500">
                {u.role}
              </p>
            </div>

            <button
              onClick={() => deleteUser(u._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}