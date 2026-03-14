import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Product";
import Cart from "./Pages/Cart";
import AdminDashboard from "./Pages/AdminDashboard";
import Orders from "./Pages/Orders";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";


function App() {

  return (

    <Router>

      {/* Routes */}
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products/>}/>

        <Route path="/cart" element={<Cart />} />

        <Route path="/admin" element = {<AdminDashboard />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/wishlist" element={<Wishlist />}/>

        <Route path="/profile" element={<Profile />}/>
      


      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </Router>

  );

}

export default App;