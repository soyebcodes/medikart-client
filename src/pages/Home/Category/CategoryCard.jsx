import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";

const fetchCategories = async () => {
  const res = await axios.get("http://localhost:5000/api/categories");
  return res.data; // returns array of categories directly
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

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories.</div>;

  if (!Array.isArray(categories) || categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            onClick={() =>
              navigate(`/category/${encodeURIComponent(category.categoryName)}`)
            }
          >
            <img
              src={category.categoryImage}
              alt={category.categoryName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold mb-2">
                {category.categoryName}
              </h3>
              <p className="text-gray-600">Medicines available</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCardSection;
