import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const fetchCategories = async() => {
    const {data} = await axios.get(`${BASE_URL}/api/categories`)
    return data
}