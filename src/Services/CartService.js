import axios from "axios";
import { api } from "./AuthService";

const BASE_URL = "https://ecommerce-production-744f.up.railway.app/cart";
// const BASE_URL="http://localhost:8080/cart"

export const cartService = {

  // Add product to cart
  addToCart: async (userId, productId, quantity) => {

    const response = await api.post(
      `${BASE_URL}/user/${userId}/product/${productId}/quantity?quantity=${quantity}`
    );

    return response.data;
  },

  // Get cart items
  viewCart: async (userId) => {

    const response = await api.get(
      `${BASE_URL}/user/${userId}`
    );

    return response.data;
  },

  // Update quantity
  updateQuantity: async (userId, productId, quantity) => {

    const response = await api.put(
      `${BASE_URL}/quantity/user/${userId}/product/${productId}/quantity?quantity=${quantity}`
    );

    return response.data;
  },

  // Remove product
  removeFromCart: async (userId, productId) => {

    const response = await api.delete(
      `${BASE_URL}/remove/${userId}/${productId}`
    );

    return response.data;
  },

  // Clear cart
  clearCart: async (userId) => {

    const response = await api.put(
      `${BASE_URL}/clear/${userId}`
    );

    return response.data;
  }

};

export default cartService;