import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-hot-toast";

const UpdateProfile = () => {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error("No user is logged in");
      return;
    }

    try {
      setLoading(true);

      // ✅ Update Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // ✅ Update Zustand store
      setUser({
        ...auth.currentUser,
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-8  shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
