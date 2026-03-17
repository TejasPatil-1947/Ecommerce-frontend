import axios from "axios";
// 
const BASE_URL = "https://ecommerce-production-744f.up.railway.app";
// const BASE_URL="http://localhost:8080"

/* ================= AXIOS INSTANCE ================= */

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* ================= TOKEN HELPER ================= */

const getToken = () => localStorage.getItem("token");

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  const isAuthRequest =
    config.url.includes("/auth/login") ||
    config.url.includes("/auth/register");

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - redirecting to login");
          // authService.logout();
          // window.location.href = "/login";
          break;

        case 403:
          console.error("Forbidden access");
          // window.location.href = "/login";
          break;

        case 404:
          console.error("Resource not found");
          break;

        case 500:
          console.error("Internal server error");
          break;

        default:
          console.error("API Error:", error.response.status);
      }
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

/* ================= AUTH SERVICE ================= */

const authService = {

  register: async (user) => {
    try {
      const response = await api.post("/auth/register", user);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data;

      if (token) {
        localStorage.setItem("token", token);
      }
      console.log("token",token)
      return token;

    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },
  logout: () => {
        localStorage.clear();
    },

   currentUser: async () => {
        try {
            const response = await api.get(`/auth/currentUser`);
            console.log("User: ",response.data)
            sessionStorage.setItem('user', JSON.stringify(response.data))
            return response.data;
        } catch (error) {
            console.error('Fail to load current logged in user')
            throw error;
        }
    },
};

export { api, authService };