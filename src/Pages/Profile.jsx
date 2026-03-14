import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import userService from "../Services/UserService";
import addressService from "../Services/AddressService";
import { toast } from "react-toastify";

const Profile = () => {

  const user1 = JSON.parse(sessionStorage.getItem("user"));
  const userId = user1?.id;

  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  const [addresses,setAddresses] = useState([]);

  const [newAddress,setNewAddress] = useState({
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:""
  });

  useEffect(()=>{
    loadUser();
    loadAddresses();
  },[]);

  const loadUser = async () =>{
    try{
      const response = await userService.getUserById(userId);
      setUser(response.data);
    }catch(error){
      toast.error("Failed to load profile");
    }
  }

  const loadAddresses = async ()=>{
    try{
      const response = await addressService.getAddressByUser(userId);
      setAddresses(response.data);
    }catch(error){
      toast.error("Failed to load addresses");
    }
  }

  const handleUserChange = (e)=>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
  }

  const handleAddressChange = (e)=>{
    const {name,value} = e.target;
    setNewAddress({...newAddress,[name]:value});
  }

  const updateProfile = async (e)=>{
    e.preventDefault();

    try{
      await userService.updateUser(userId,user);
      toast.success("Profile updated");
    }catch(error){
      toast.error("Profile update failed");
    }
  }

  const addAddress = async (e)=>{
    e.preventDefault();

    try{
      await addressService.addAddress(userId,newAddress);
      toast.success("Address added");

      setNewAddress({
        street:"",
        city:"",
        state:"",
        pincode:"",
        country:""
      });

      loadAddresses();

    }catch(error){
      toast.error("Failed to add address");
    }
  }

  const deleteAddress = async(addressId)=>{
    try{
      await addressService.deleteAddress(userId,addressId);
      toast.success("Address deleted");
      loadAddresses();
    }catch(error){
      toast.error("Delete failed");
    }
  }

  return (
    <>
    <Navbar/>

    <div className="container mt-5">

      {/* Profile Section */}

      <div className="card p-4 mb-4">

        <div className="text-center">

          <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          width="120"
          alt="profile"
          />

          <h3 className="mt-3">{user.name}</h3>
          <p>{user.email}</p>

        </div>

        <hr/>

        <form onSubmit={updateProfile}>

          <div className="row">

            <div className="col-md-6">
              <label>Name</label>
              <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleUserChange}
              />
            </div>

            <div className="col-md-6">
              <label>Email</label>
              <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              />
            </div>

          </div>

          <button className="btn btn-primary mt-3">
            Update Profile
          </button>

        </form>

      </div>

      {/* Address Section */}

      <div className="card p-4 mb-4">

        <h4>Your Addresses</h4>

        {addresses.length === 0 && (
          <p className="text-muted">No addresses added</p>
        )}

        {addresses.map((addr)=>(
          <div className="border p-3 mb-3 rounded" key={addr.id}>

            <p>{addr.street}</p>
            <p>{addr.city}, {addr.state}</p>
            <p>{addr.pincode}, {addr.country}</p>

            <button
            className="btn btn-danger btn-sm"
            onClick={()=>deleteAddress(addr.id)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

      {/* Add Address */}

      <div className="card p-4">

        <h4>Add New Address</h4>

        <form onSubmit={addAddress}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <input
              type="text"
              className="form-control"
              placeholder="Street"
              name="street"
              value={newAddress.street}
              onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              value={newAddress.city}
              onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
              type="text"
              className="form-control"
              placeholder="State"
              name="state"
              value={newAddress.state}
              onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
              type="number"
              className="form-control"
              placeholder="Pincode"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              value={newAddress.country}
              onChange={handleAddressChange}
              />
            </div>

          </div>

          <button className="btn btn-success">
            Add Address
          </button>

        </form>

      </div>

    </div>

    </>
  )
}

export default Profile;