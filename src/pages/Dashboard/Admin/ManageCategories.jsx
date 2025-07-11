import React, { useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categoryApi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

const LoaderButton = ({ loading, children, ...props }) => (
  <button
    disabled={loading}
    {...props}
    className={`${props.className} flex items-center justify-center`}
  >
    {loading && <FaSpinner className="animate-spin mr-2" />}
    {children}
  </button>
);

const ManageCategories = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error(
        "Create category failed:",
        error.response?.data || error.message
      );
      toast.error(
        "Failed to create category: " +
          (error.response?.data?.message || error.message)
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, category }) => updateCategory(id, category),
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries(["categories"]);
      setEditingCategory(null);
    },
    onError: (error) => {
      toast.error("Failed to update category: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error("Failed to delete category: " + error.message);
    },
  });

  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryImage: null,
  });

  const [editingCategory, setEditingCategory] = useState(null);

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  const handleFileChange = (file, setter) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Unsupported file type. Allowed: JPEG, PNG, GIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 2 MB limit.");
      return;
    }

    setter(file);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCategory.categoryName || !newCategory.categoryImage) {
      return toast.error("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("categoryName", newCategory.categoryName);
    formData.append("categoryImage", newCategory.categoryImage);

    createMutation.mutate(formData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingCategory.categoryName) {
      return toast.error("Please fill category name");
    }

    const formData = new FormData();
    formData.append("categoryName", editingCategory.categoryName);

    if (editingCategory.categoryImage instanceof File) {
      formData.append("categoryImage", editingCategory.categoryImage);
    }

    updateMutation.mutate({ id: editingCategory._id, category: formData });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      <form
        onSubmit={handleCreate}
        className="mb-6 flex flex-wrap gap-2 items-center"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.categoryName}
          onChange={(e) =>
            setNewCategory({ ...newCategory, categoryName: e.target.value })
          }
          className="input input-bordered"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileChange(e.target.files[0], (file) =>
              setNewCategory({ ...newCategory, categoryImage: file })
            )
          }
          className="input input-bordered"
        />
        <LoaderButton
          type="submit"
          className="btn btn-primary"
          loading={createMutation.isLoading}
        >
          Add Category
        </LoaderButton>
      </form>

      <ul>
        {data.map((cat) => (
          <li key={cat._id} className="mb-4 flex items-center space-x-4">
            {editingCategory?._id === cat._id ? (
              <>
                <input
                  type="text"
                  value={editingCategory.categoryName}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      categoryName: e.target.value,
                    })
                  }
                  className="input input-bordered"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e.target.files[0], (file) =>
                      setEditingCategory({
                        ...editingCategory,
                        categoryImage: file,
                      })
                    )
                  }
                  className="input input-bordered"
                />
                <LoaderButton
                  onClick={handleUpdate}
                  className="btn btn-success btn-sm mr-2"
                  loading={updateMutation.isLoading}
                >
                  Save
                </LoaderButton>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="btn btn-warning btn-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img
                  src={cat.categoryImage}
                  alt={cat.categoryName}
                  className="w-12 h-12 rounded"
                />
                <span>{cat.categoryName}</span>
                <button
                  onClick={() => setEditingCategory(cat)}
                  className="btn btn-outline btn-sm ml-auto mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(cat._id)}
                  className="btn btn-error btn-sm"
                  disabled={deleteMutation.isLoading}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
