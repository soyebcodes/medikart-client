import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddMedicineModal = ({ refetch, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("genericName", data.genericName);
    formData.append("shortDescription", data.shortDescription);
    formData.append("category", data.category);
    formData.append("company", data.company);
    formData.append("unit", data.unit.toUpperCase());
    formData.append("pricePerUnit", parseFloat(data.pricePerUnit));
    formData.append(
      "discountPercentage",
      parseFloat(data.discountPercentage || 0)
    );
    formData.append("image", data.image[0]); // file

    try {
      await axiosSecure.post("/api/medicines", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success", "Medicine added successfully!", "success");
      reset();
      refetch();
      closeModal();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Upload failed", "error");
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
        type="file"
        accept="image/*"
        {...register("image", { required: true })}
        className="file-input file-input-bordered col-span-2"
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
