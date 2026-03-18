import { api } from "./AuthService";

// const BASE_URL = "https://ecommerce-production-744f.up.railway.app";
const BASE_URL = "http://localhost:8080";

const userService = {

    // Get user by ID
    getUserById: async (userId) => {
        try {
            const response = await api.get(`${BASE_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user", error);
            throw error;
        }
    },

    // Update user
    updateUser: async (userId, user) => {
        try {
            const response = await api.put(`${BASE_URL}/user/update/${userId}`, user);
            return response.data;
        } catch (error) {
            console.error("Failed to update user", error);
            throw error;
        }
    },

    getAllUsers: async ()=>{
        try {
            const response = await api.get(`${BASE_URL}/user/`);
            return response.data;

        } catch (error) {
            console.error("Fail to get all users");
            throw error;
        }
    },

    deactivateUser: async (userId) => {
        try {
            const response = await api.put(`${BASE_URL}/user/deactivateUser/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Fail to deactivate user");
            throw error;
        }
    },
     activateUser: async (userId) => {
        try {
            const response = await api.put(`${BASE_URL}/user/activateUser/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Fail to activate user");
            throw error;
        }
    }

};

export default userService;