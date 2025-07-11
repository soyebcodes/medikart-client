import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddMedicineModal from "./AddMedicineModal";
import { jwtDecode } from "jwt-decode";

const ManageMedicines = () => {
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const token = localStorage.getItem("access-token");
  const sellerEmail = token ? jwtDecode(token)?.email : null;

  const { data: medicines = [], refetch } = useQuery({
    queryKey: ["medicines", sellerEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/medicines/seller/${sellerEmail}`);
      return res.data;
    },
    enabled: !!sellerEmail,
  });

  if (!sellerEmail) return <p>Please log in to view your medicines.</p>;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/medicines/${id}`);
      refetch();
      Swal.fire("Deleted!", "Medicine removed.", "success");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Medicines</h2>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          + Add Medicine
        </button>
      </div>

      {/* Modal */}
      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Add New Medicine</h3>
            <AddMedicineModal
              refetch={refetch}
              closeModal={() => setOpen(false)}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Advertised</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id}>
                <td>{med.name}</td>
                <td>${med.pricePerUnit}</td>
                <td>{med.discountPercentage}%</td>
                <td>{med.isAdvertised ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(med._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
