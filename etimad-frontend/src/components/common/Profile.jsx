import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [showModal, setShowModal] =
    useState(false);

  const [passwords, setPasswords] =
    useState({
      password: "",
      confirmPassword: ""
    });


  // LOAD PROFILE
  useEffect(() => {
    API.get("/users/profile")
      .then(res => setUser(res.data));
  }, []);


  // UPDATE PROFILE
  const updateProfile = async () => {

    try {

      const res = await API.put(
        "/users/profile",
        user
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Profile updated");

    } catch {
      alert("Update failed");
    }
  };


  // CHANGE PASSWORD
  const changePassword = async () => {

    if (
      passwords.password !==
      passwords.confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    try {

      await API.put(
        "/users/change-password",
        {
          password: passwords.password
        }
      );

      alert("Password updated");

      setShowModal(false);

      setPasswords({
        password: "",
        confirmPassword: ""
      });

    } catch {
      alert("Failed to update password");
    }
  };


  return (
    <div className="max-w-3xl">

      <h1 className="text-4xl font-bold mb-10">
        My Profile
      </h1>


      <div className="bg-white rounded-3xl shadow p-10">

        {/* NAME */}
        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Name
          </label>

          <input
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value
              })
            }
            className="w-full border p-4 rounded-2xl"
          />
        </div>


        {/* EMAIL */}
        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value
              })
            }
            className="w-full border p-4 rounded-2xl"
          />
        </div>


        {/* PHONE */}
        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Phone
          </label>

          <input
            value={user.phone}
            onChange={(e) =>
              setUser({
                ...user,
                phone: e.target.value
              })
            }
            className="w-full border p-4 rounded-2xl"
          />
        </div>


        {/* BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={updateProfile}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl"
             style={{
              background:"#22666B",}}
          >

            Save Changes
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="border px-8 py-4 rounded-2xl"
          >
            Change Password
          </button>

        </div>

      </div>


      {/* PASSWORD MODAL */}
      {showModal && (

        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >

          <div
            className="bg-white w-full max-w-md rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-2xl font-bold mb-6">
              Change Password
            </h2>


            <input
              type="password"
              placeholder="New Password"
              value={passwords.password}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  password: e.target.value
                })
              }
              className="w-full border p-4 rounded-2xl mb-4"
            />


            <input
              type="password"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value
                })
              }
              className="w-full border p-4 rounded-2xl mb-6"
            />


            <button
              onClick={changePassword}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl"
               style={{
              background:"#22666B",}}
            >
              Update Password
            </button>

          </div>

        </div>
      )}

    </div>
  );
}