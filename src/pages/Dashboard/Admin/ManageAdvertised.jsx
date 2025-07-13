import React, { useEffect, useState } from "react";

const ManageAdvertised = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("https://medikart-server-pjna.onrender.com/api/advertised")
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, []);

  const toggleSlider = async (_id) => {
    const res = await fetch(
      `https://medikart-server-pjna.onrender.com/api/advertised/${_id}/toggle`,
      {
        method: "PATCH",
      }
    );

    if (res.ok) {
      setAds((prev) =>
        prev.map((ad) =>
          ad._id === _id ? { ...ad, isInSlider: !ad.isInSlider } : ad
        )
      );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📢 Manage Advertised Medicines
      </h2>

      {ads.length === 0 ? (
        <p className="text-center text-gray-500">
          No advertised medicines yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Seller Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id}>
                  <td>
                    <img
                      src={ad.imageUrl}
                      alt={ad.medicineName}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td>{ad.medicineName}</td>
                  <td className="max-w-xs truncate" title={ad.description}>
                    {ad.description}
                  </td>
                  <td>{ad.sellerEmail}</td>
                  <td>
                    <span
                      className={`badge ${
                        ad.isInSlider ? "badge-success" : "badge-error"
                      }`}
                    >
                      {ad.isInSlider ? "In Slider" : "Not in Slider"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleSlider(ad._id)}
                      className={`btn btn-sm ${
                        ad.isInSlider ? "btn-error" : "btn-success"
                      }`}
                    >
                      {ad.isInSlider ? "Remove from Slide" : "Add to Slide"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAdvertised;
