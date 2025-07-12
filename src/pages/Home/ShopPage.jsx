import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";

const ShopPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/medicines");
        setMedicines(res.data);
      } catch (err) {
        setError("Failed to load medicines.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  // Placeholder: replace with your cart handler/context
  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    setSelectedMedicine(medicine); // Show details after adding to cart
    // TODO: integrate your cart logic here
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-primary">Shop Medicines</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Generic Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Discount %</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id} className="hover:bg-base-100">
                <td>{med.name}</td>
                <td>{med.genericName}</td>
                <td>{med.category}</td>
                <td>{med.company}</td>
                <td>{med.unit}</td>
                <td>${med.pricePerUnit.toFixed(2)}</td>
                <td>{med.discountPercentage || 0}%</td>
                <td className="flex justify-center gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedMedicine(med)}
                    aria-label={`View details of ${med.name}`}
                  >
                    👁️
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAddToCart(med)}
                    aria-label={`Select ${med.name} to add to cart`}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing medicine details */}
      {selectedMedicine && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedMedicine(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-sm btn-ghost absolute top-3 right-3"
              onClick={() => setSelectedMedicine(null)}
              aria-label="Close details modal"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedMedicine.name}</h3>
            <img
              src={selectedMedicine.image || "/default-product.png"}
              alt={selectedMedicine.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p>
              <strong>Generic Name:</strong> {selectedMedicine.genericName}
            </p>
            <p>
              <strong>Category:</strong> {selectedMedicine.category}
            </p>
            <p>
              <strong>Company:</strong> {selectedMedicine.company}
            </p>
            <p>
              <strong>Unit:</strong> {selectedMedicine.unit}
            </p>
            <p>
              <strong>Price Per Unit:</strong> $
              {selectedMedicine.pricePerUnit.toFixed(2)}
            </p>
            <p>
              <strong>Discount Percentage:</strong>{" "}
              {selectedMedicine.discountPercentage || 0}%
            </p>
            <p className="mt-3">
              <strong>Description:</strong>{" "}
              {selectedMedicine.shortDescription || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
