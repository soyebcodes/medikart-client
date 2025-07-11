import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/categories`);
  return data;
};

// For createCategory and updateCategory, expect 'category' to be FormData
export const createCategory = async (formData) => {
  return (await axios.post(`${BASE_URL}/api/categories`, formData)).data;
};

export const updateCategory = async (id, formData) => {
  return (await axios.put(`${BASE_URL}/api/categories/${id}`, formData)).data;
};


export const deleteCategory = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/api/categories/${id}`);
  return data;
};
