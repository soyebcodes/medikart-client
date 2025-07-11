import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditMedicineModal = ({ medicine, closeModal, refetch }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: medicine.name,
      genericName: medicine.genericName,
      shortDescription: medicine.shortDescription,
      image: medicine.image,
      category: medicine.category,
      company: medicine.company,
      unit: medicine.unit,
      pricePerUnit: medicine.pricePerUnit,
      discountPercentage: medicine.discountPercentage,
    },
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    data.pricePerUnit = parseFloat(data.pricePerUnit);
    data.discountPercentage = parseFloat(data.discountPercentage || 0);
    data.unit = data.unit.toUpperCase();

    try {
      const res = await axiosSecure.patch(
        `/api/medicines/${medicine._id}`,
        data
      );
      if (res.data?.updated) {
        Swal.fire("Success", "Medicine updated!", "success");
        refetch();
        closeModal();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Failed to update medicine",
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
        <option value="MG">MG</option>
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
      />

      <div className="col-span-2 flex justify-end">
        <button type="submit" className="btn btn-primary">
          Update Medicine
        </button>
      </div>
    </form>
  );
};

export default EditMedicineModal;
