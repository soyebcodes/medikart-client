import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddMedicineModal = ({ refetch, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    data.pricePerUnit = parseFloat(data.pricePerUnit);
    data.discountPercentage = parseFloat(data.discountPercentage || 0);
    data.unit = data.unit.toUpperCase();

    try {
      await axiosSecure.post("/api/medicines", data);
      Swal.fire("Success", "Medicine added!", "success");
      reset();
      refetch(); // refresh the medicine list
      closeModal(); // close the modal
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to add medicine",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input
        {...register("name")}
        placeholder="Medicine Name"
        className="input input-bordered"
        required
      />
      <input
        {...register("genericName")}
        placeholder="Generic Name"
        className="input input-bordered"
        required
      />

      <input
        {...register("category")}
        placeholder="Category"
        className="input input-bordered"
        required
      />
      <input
        {...register("company")}
        placeholder="Company Name"
        className="input input-bordered"
        required
      />

      <input
        {...register("image")}
        placeholder="Image URL"
        className="input input-bordered col-span-2"
        required
      />
      <textarea
        {...register("shortDescription")}
        placeholder="Short Description"
        className="textarea textarea-bordered col-span-2"
        required
      />

      <select {...register("unit")} className="select select-bordered" required>
        <option value="">Select Unit</option>
        <option value="Mg">Mg</option>
        <option value="ML">ML</option>
      </select>

      <input
        {...register("pricePerUnit")}
        type="number"
        step="0.01"
        placeholder="Price per Unit"
        className="input input-bordered"
        required
      />

      <input
        {...register("discountPercentage")}
        type="number"
        step="0.01"
        placeholder="Discount (%)"
        className="input input-bordered"
        defaultValue={0}
      />

      <div className="col-span-2 flex justify-end">
        <button type="submit" className="btn btn-success">
          Add Medicine
        </button>
      </div>
    </form>
  );
};

export default AddMedicineModal;
