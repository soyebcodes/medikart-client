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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Advertised Medicines</h2>
      <table className="w-full text-left border">
        <thead className="">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Seller Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad._id} className="border-t">
              <td className="p-2">
                <img
                  src={ad.imageUrl}
                  alt={ad.medicineName}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="p-2">{ad.medicineName}</td>
              <td className="p-2">{ad.description}</td>
              <td className="p-2">{ad.sellerEmail}</td>
              <td className="p-2">
                {ad.isInSlider ? (
                  <span className="text-green-600 font-semibold">
                    In Slider
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Not in Slider
                  </span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => toggleSlider(ad._id)}
                  className={`px-4 py-1 rounded text-white ${
                    ad.isInSlider ? "bg-red-600" : "bg-green-600"
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
  );
};

export default ManageAdvertised;
