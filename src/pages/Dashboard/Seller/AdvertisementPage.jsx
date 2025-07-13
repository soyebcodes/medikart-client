import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertisementPage = () => {
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("access-token");
  const sellerEmail = token ? jwtDecode(token)?.email : null;

  const [ads, setAds] = useState([]);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAds = async () => {
    try {
      const res = await axiosSecure.get(
        `/api/seller/${sellerEmail}/advertisements`
      );
      setAds(res.data);
    } catch (error) {
      console.error("Failed to fetch ads", error);
    }
  };

  useEffect(() => {
    if (sellerEmail) fetchAds();
  }, [sellerEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return Swal.fire(
        "Missing Image",
        "Please select an image to upload.",
        "warning"
      );
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("description", description);

    try {
      setLoading(true);
      await axiosSecure.post(
        `/api/seller/${sellerEmail}/advertisements`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      Swal.fire("Success", "Advertisement request sent!", "success");
      fetchAds();
      setShowModal(false);
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error("Upload failed", error);
      Swal.fire("Error", "Failed to upload advertisement", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Advertisement Requests</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Advertisement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Status</th>
              <th>Requested</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td>
                  <img
                    src={ad.imageUrl}
                    alt="ad"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{ad.description}</td>
                <td>
                  <span
                    className={`badge ${
                      ad.isInSlider ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {ad.isInSlider ? "Approved" : "Pending"}
                  </span>
                </td>
                <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">
              Request New Advertisement
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="file-input file-input-bordered w-full"
                required
              />
              <textarea
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                maxLength={150}
                required
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdvertisementPage;
