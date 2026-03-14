import { api } from "./AuthService";


const BASE_URL = "https://ecommerce-production-744f.up.railway.app/wishlist";

const wishlistService = {

  addToWishlist: async (userId, productId) => {
    const res = await api.post(`${BASE_URL}/add/${userId}/${productId}`);
    return res.data;
  },

  getWishlist: async (userId) => {
    const res = await api.get(`${BASE_URL}/user/${userId}`);
    return res.data;
  },

  removeProduct: async (userId, productId) => {
    const res = await api.delete(`${BASE_URL}/remove/${userId}/${productId}`);
    return res.data;
  }

};

export default wishlistService;