import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dialog } from "@headlessui/react";

const fetchMedicinesByCategory = async (categoryName) => {
  const res = await axios.get(`/api/medicines/category/${categoryName}`);
  return res.data;
};

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: medicines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["medicines-by-category", categoryName],
    queryFn: () => fetchMedicinesByCategory(categoryName),
  });

  if (isLoading)
    return (
      <div className="text-center my-10 text-blue-500 font-medium">
        Loading medicines...
      </div>
    );
  if (error)
    return (
      <div className="text-center my-10 text-red-500 font-medium">
        Failed to load medicines.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Medicines in <span className="text-secondary">{categoryName}</span>
      </h2>

      {medicines.length === 0 ? (
        <div className="text-center text-gray-500">No medicines found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border border-gray-200">
            <thead className="bg-base-200 text-base font-semibold">
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
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>
                  <td>{med.name || "N/A"}</td>
                  <td>{med.genericName || "N/A"}</td>
                  <td>{med.company || "N/A"}</td>
                  <td>
                    {med.pricePerUnit
                      ? `$${Number(med.pricePerUnit).toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td>
                    {med.discountPercentage > 0 ? (
                      <span className="badge badge-success">
                        {med.discountPercentage}% OFF
                      </span>
                    ) : (
                      <span className="badge badge-ghost">None</span>
                    )}
                  </td>
                  <td className="space-x-1">
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => alert("Add to cart")}
                    >
                      Select
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-secondary"
                      onClick={() => {
                        setSelectedMedicine(med);
                        setIsOpen(true);
                      }}
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for medicine details */}
      {selectedMedicine && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 space-y-4 shadow-xl">
              <Dialog.Title className="text-xl font-bold text-center">
                {selectedMedicine.name}
              </Dialog.Title>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-48 object-cover rounded"
              />
              <div>
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
                  {selectedMedicine.discountPercentage > 0
                    ? `${selectedMedicine.discountPercentage}%`
                    : "None"}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {selectedMedicine.shortDescription ||
                    "No description provided."}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  className="btn btn-sm btn-neutral"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CategoryDetails;
