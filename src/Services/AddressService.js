import { api } from "./AuthService";

const BASE_URL = "https://ecommerce-production-744f.up.railway.app/address";
// const BASE_URL="http://localhost:8080/address"

export const addressService = {

  // Get address by user
  getAddressByUser: async (userId) => {

    const response = await api.get(
      `${BASE_URL}/${userId}`
    );
    console.log(userId)
    return response.data;
  },

  // Add address
  addAddress: async (userId, address) => {

    const response = await api.post(
      `${BASE_URL}/add/${userId}`,
      address
    );

    return response.data;
  },

  // Delete address
  deleteAddress: async (userId, addressId) => {

    const response = await api.delete(
      `${BASE_URL}/delete/${userId}/${addressId}`
    );

    return response.data;
  }

};

export default addressService;