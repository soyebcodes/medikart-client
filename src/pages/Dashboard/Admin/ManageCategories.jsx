import React, { useState } from "react";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categoryApi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ManageCategories = () => {
  const queryClient = useQueryClient();

  // Fetch categories
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Create Category mutation
  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Update Category mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, category }) => updateCategory(id, category),
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditingCategory(null);
    },
    onError: (error) =>
      toast.error("Failed to update category: " + error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) =>
      toast.error("Failed to delete category: " + error.message),
  });

  // Form state for new category
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryImage: "",
  });

  // For editing category
  const [editingCategory, setEditingCategory] = useState(null);

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  // Handlers
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
      return toast.error("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("categoryName", editingCategory.categoryName);

    // Append image only if it's a File object (means user uploaded new image)
    if (editingCategory.categoryImage instanceof File) {
      formData.append("categoryImage", editingCategory.categoryImage);
    }

    updateMutation.mutate({ id: editingCategory._id, category: formData });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* New Category Form */}
      <form onSubmit={handleCreate} className="mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.categoryName}
          onChange={(e) =>
            setNewCategory({ ...newCategory, categoryName: e.target.value })
          }
          className="input input-bordered mr-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewCategory({ ...newCategory, categoryImage: e.target.files[0] })
          }
          className="input input-bordered mr-2"
        />

        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>

      {/* Categories List */}
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
                  className="input input-bordered mr-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      categoryImage: e.target.files[0],
                    })
                  }
                  className="input input-bordered mr-2"
                />

                <button
                  onClick={handleUpdate}
                  className="btn btn-success btn-sm mr-2"
                >
                  Save
                </button>
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
