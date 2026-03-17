
import { api } from "./AuthService";

// const BASE_URL = "https://ecommerce-production-744f.up.railway.app";
const BASE_URL="http://localhost:8080"

class UserService {

    getUserById(userId){
        return api.get(`${BASE_URL}/user/${userId}`);
    }

    updateUser(userId,user){
        return api.put(`${BASE_URL}/user/update/${userId}`,user);
    }

}

export default new UserService();