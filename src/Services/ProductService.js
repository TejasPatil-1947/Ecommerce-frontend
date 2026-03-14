import { api } from "./AuthService";

const PRODUCT_URL = "/product";



export const productService = {

  getAllProducts: async () => {
    const response = await api.get(`${PRODUCT_URL}/`);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`${PRODUCT_URL}/${id}`);
    return response.data;
  },

  getProductsByCategory: async (id) => {
    const response = await api.get(`${PRODUCT_URL}/category/${id}`);
    return response.data;
  },

  createProduct: async (cId, product) => {
    const response = await api.post(`${PRODUCT_URL}/create/${cId}`, product);
    return response.data;
  },

 updateProduct: async (id, categoryId, product) => {
  const response = await api.put(`${PRODUCT_URL}/update/${id}/${categoryId}`, product);
  return response.data;
},
  getProductsByCategoryName: async (name) => {
  const response = await api.get(`${PRODUCT_URL}/name?name=${name}`);
  return response.data;
},

  deleteProduct: async (id) => {
    const response = await api.delete(`${PRODUCT_URL}/delete/${id}`);
    return response.data;
  }

};