import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const fetchCategories = async() => {
    const {data} = await axios.get(`${BASE_URL}/api/categories`)
    return data
}

export const createCategory = async (category) => {
    const {data} = await axios.post(`${BASE_URL}/api/categories`, category)
    return data
}

export const updateCategory = async (id, category) => {
    const {data} = await axios.put(`${BASE_URL}/api/categories/${id}`, category)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await axios.delete(`${BASE_URL}/api/categories/${id}`)
    return data
}