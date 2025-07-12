import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddMedicineModal = ({ closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  // Mutation for adding medicine
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/api/medicines", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      Swal.fire("Success", "Medicine added successfully!", "success");
      reset();
      closeModal();
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Upload failed",
        "error"
      );
    },
  });

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
    formData.append("image", data.image[0]); // file input

    await mutateAsync(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 p-4"
    >
      <input
        {...register("name", { required: true })}
        placeholder="Medicine Name"
        className="input input-bordered col-span-2 md:col-span-1"
      />
      <input
        {...register("genericName", { required: true })}
        placeholder="Generic Name"
        className="input input-bordered col-span-2 md:col-span-1"
      />

      <input
        {...register("category", { required: true })}
        placeholder="Category"
        className="input input-bordered col-span-2 md:col-span-1"
      />
      <input
        {...register("company", { required: true })}
        placeholder="Company Name"
        className="input input-bordered col-span-2 md:col-span-1"
      />

      <input
        type="file"
        accept="image/*"
        {...register("image", { required: true })}
        className="file-input file-input-bordered col-span-2"
      />

      <textarea
        {...register("shortDescription", { required: true })}
        placeholder="Short Description"
        className="textarea textarea-bordered col-span-2"
        rows={3}
      />

      <select
        {...register("unit", { required: true })}
        className="select select-bordered col-span-2 md:col-span-1"
      >
        <option value="">Select Unit</option>
        <option value="MG">MG</option>
        <option value="ML">ML</option>
        <option value="G">G</option>
        <option value="Tablet">Tablet</option>
        <option value="Capsule">Capsule</option>
      </select>

      <input
        {...register("pricePerUnit", { required: true })}
        type="number"
        step="0.01"
        placeholder="Price per Unit"
        className="input input-bordered col-span-2 md:col-span-1"
      />

      <input
        {...register("discountPercentage")}
        type="number"
        step="0.01"
        placeholder="Discount (%)"
        className="input input-bordered col-span-2 md:col-span-1"
        defaultValue={0}
      />

      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-success w-full md:w-auto"
        >
          {isPending ? "Adding..." : "Add Medicine"}
        </button>
      </div>
    </form>
  );
};

export default AddMedicineModal;
