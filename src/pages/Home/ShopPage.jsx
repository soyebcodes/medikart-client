import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";
import { Helmet } from "react-helmet-async";

const PAGE_SIZE = 10;

const ShopPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  // New state for pagination, sorting and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://medikart-server-pjna.onrender.com/api/medicines"
        );
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

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    setSelectedMedicine(medicine); // Show details after adding to cart
  };

  // Filter medicines by search term (name, genericName, company)
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const term = searchTerm.toLowerCase();
      return (
        med.name.toLowerCase().includes(term) ||
        med.genericName.toLowerCase().includes(term) ||
        med.company.toLowerCase().includes(term)
      );
    });
  }, [medicines, searchTerm]);

  // Sort medicines by price
  const sortedMedicines = useMemo(() => {
    if (!sortOrder) return filteredMedicines;

    return [...filteredMedicines].sort((a, b) => {
      if (sortOrder === "asc") return a.pricePerUnit - b.pricePerUnit;
      else return b.pricePerUnit - a.pricePerUnit;
    });
  }, [filteredMedicines, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedMedicines.length / PAGE_SIZE);
  const paginatedMedicines = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedMedicines.slice(start, start + PAGE_SIZE);
  }, [sortedMedicines, currentPage]);

  // Reset page to 1 if searchTerm or sortOrder changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <Helmet>
        <title>Shop | MediKart</title>
      </Helmet>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-primary">Shop Medicines</h1>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by name, generic or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full sm:max-w-xs"
            aria-label="Search medicines"
          />

          <select
            className="select select-bordered w-full sm:max-w-xs"
            value={sortOrder || ""}
            onChange={(e) => setSortOrder(e.target.value || null)}
            aria-label="Sort by price"
          >
            <option value="">Sort by Price (default)</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Medicines table */}
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
              {paginatedMedicines.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No medicines found.
                  </td>
                </tr>
              ) : (
                paginatedMedicines.map((med) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  className={`btn btn-sm ${
                    currentPage === pageNum ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

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
              <h3 className="text-2xl font-bold mb-4">
                {selectedMedicine.name}
              </h3>
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
    </>
  );
};

export default ShopPage;
