import axios from "axios";
import { api } from "./AuthService";

// const BASE_URL = "https://ecommerce-production-744f.up.railway.app/order";
const BASE_URL="http://localhost:8080/order"

const orderService = {

  // Create order (Razorpay order creation)
  createOrder: async (userId) => {
    const response = await api.post(`${BASE_URL}/create/${userId}`);
    return response.data;
  },

  // Verify payment
  verifyPayment: async (orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature) => {

    const response = await api.post(
      `${BASE_URL}/verify`,
      null,
      {
        params: {
          orderId: orderId,
          razorpayPaymentId: razorpayPaymentId,
          razorpayOrderId: razorpayOrderId,
          razorpaySignature: razorpaySignature
        }
      }
    );

    return response.data;
  },

  // Get order by orderId
  getOrderById: async (orderId) => {
    const response = await api.get(`${BASE_URL}/${orderId}`);
    return response.data;
  },

  // Get all orders of a user
  getOrdersByUser: async (userId) => {
    const response = await api.get(`${BASE_URL}/user/${userId}`);
    console.log(response.data)
    return response.data;

  },
  cancelOrder: async (orderId) => {
  const response = await api.put(`${BASE_URL}/cancel/${orderId}`);
  return response.data;
},

  // Get all orders (admin)
  getAllOrders: async () => {
    const response = await api.get(`${BASE_URL}/allOrders`);
    return response.data;
  },

  // Update order status (admin)
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(
      `${BASE_URL}/update/${orderId}?status=${status}`
    );
    return response.data;
  },

  // Delete order
  deleteOrder: async (orderId) => {
    const response = await api.delete(`${BASE_URL}/delete/${orderId}`);
    return response.data;
  }

};

export default orderService;