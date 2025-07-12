import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { useCartStore } from "../../../store/cartStore";

const fetchMedicinesByCategory = async (categoryName) => {
  const res = await axios.get(`/api/medicines/category/${categoryName}`);
  return res.data;
};

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const {
    data: medicines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["medicines-by-category", categoryName],
    queryFn: () => fetchMedicinesByCategory(categoryName),
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading medicines.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Medicines in <span className="text-secondary">{categoryName}</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Generic</th>
              <th>Company</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id}>
                <td>
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-14 h-14 rounded"
                  />
                </td>
                <td>{med.name}</td>
                <td>{med.genericName}</td>
                <td>{med.company}</td>
                <td>${Number(med.pricePerUnit).toFixed(2)}</td>
                <td>
                  {med.discountPercentage > 0 ? (
                    <span className="badge badge-success">
                      {med.discountPercentage}%
                    </span>
                  ) : (
                    <span className="badge badge-ghost">None</span>
                  )}
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => addToCart(med)}
                  >
                    Select
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-secondary"
                    onClick={() => setSelectedMedicine(med)}
                  >
                    👁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal */}
      {selectedMedicine && (
        <>
          <input
            type="checkbox"
            id="medicine-modal"
            className="modal-toggle"
            checked
            readOnly
          />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-xl text-center mb-4">
                {selectedMedicine.name}
              </h3>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <p>
                <strong>Generic:</strong> {selectedMedicine.genericName}
              </p>
              <p>
                <strong>Company:</strong> {selectedMedicine.company}
              </p>
              <p>
                <strong>Unit:</strong> {selectedMedicine.unit}
              </p>
              <p>
                <strong>Price:</strong> $
                {Number(selectedMedicine.pricePerUnit).toFixed(2)}
              </p>
              <p>
                <strong>Discount:</strong>{" "}
                {selectedMedicine.discountPercentage || 0}%
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {selectedMedicine.shortDescription}
              </p>

              <div className="modal-action">
                <label
                  htmlFor="medicine-modal"
                  className="btn btn-neutral"
                  onClick={() => setSelectedMedicine(null)}
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDetails;
