
import { api } from "./AuthService";

const BASE_URL = "https://ecommerce-production-744f.up.railway.app/category";

const CategoryService = {

  // Create Category (Admin)
  createCategory: async (category) => {
    const response = await api.post(`${BASE_URL}/create`, category);
    return response.data;
  },

  // Get Category By Id
  getCategoryById: async (id) => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Get All Categories
  getAllCategories: async () => {
    const response = await api.get(`${BASE_URL}/`);
    return response.data;
  },

  // Search Category By Name
  searchCategoryByName: async (name) => {
    const response = await api.get(`${BASE_URL}/name?name=${name}`);
    return response.data;
  },

  deactivateCategory: async (oldC, newC) => {
    const response = await api.put(`${BASE_URL}/deactivate/${oldC}/${newC}`);
    return response.data;
  },
  activateCategory: async (id) => {
  const response = await api.put(`${BASE_URL}/activate/${id}`);
  return response.data;
}

};

export default CategoryService;