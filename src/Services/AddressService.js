
import { api } from "./AuthService";

const BASE_URL = "https://ecommerce-production-744f.up.railway.app/address";

class AddressService {

  getAddressByUser(userId){
    return api.get(`${BASE_URL}/${userId}`);
  }

  addAddress(userId,address){
    return api.post(`${BASE_URL}/add/${userId}`,address);
  }

  deleteAddress(userId,addressId){
    return api.delete(`${BASE_URL}/delete/${userId}/${addressId}`);
  }

}

export default new AddressService();