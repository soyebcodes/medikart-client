import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";

const fetchCategories = async () => {
  const res = await axios.get("http://localhost:5000/api/categories");
  return res.data;
};

const CategoryCardSection = () => {
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600">Error loading categories.</div>
    );

  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="text-center">No categories found.</div>;
  }

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-left text-primary">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="cursor-pointer group bg-base-100 border border-base-300 rounded-lg p-2 hover:shadow-xl transition-all duration-300"
            onClick={() =>
              navigate(`/category/${encodeURIComponent(category.categoryName)}`)
            }
          >
            <img
              src={category.categoryImage}
              alt={category.categoryName}
              className="w-full h-24 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="mt-2 text-center">
              <h3 className="text-sm font-semibold text-base-content truncate">
                {category.categoryName}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category.medicineCount ?? 0} medicines
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCardSection;
