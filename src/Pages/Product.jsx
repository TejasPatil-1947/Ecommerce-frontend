import React, { useEffect, useState } from "react";
import { productService } from "../Services/ProductService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { cartService } from "../Services/CartService";
import wishlistService from "../Services/WishlistService";
import Navbar from "../Components/Navbar";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const loadProducts = async () => {

    setLoading(true);

    try {

      const data = await productService.getAllProducts();
      setProducts(data);

    } catch (error) {

      toast.error("Failed to load products");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    loadProducts();

    const loggedUser = sessionStorage.getItem("user");

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }

  }, []);

  const handleLogout = () => {

    sessionStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.info("Logged out successfully");

    navigate("/login");

  };

  const addToCart = async (product) => {

    try {

      const user = JSON.parse(sessionStorage.getItem("user"));

      await cartService.addToCart(user.id, product.id, 1);

      toast.success(product.name + " added to cart 🛒");

    } catch (error) {

      toast.error("Failed to add to cart");

    }

  };

  const addToWishlist = async (product) => {

    try {

      const user = JSON.parse(sessionStorage.getItem("user"));

      await wishlistService.addToWishlist(user.id, product.id);

      toast.success(product.name + " added to wishlist ❤️");

    } catch (error) {

      toast.error("Failed to add to wishlist");

    }

  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div>

      {/* Navbar */}
      <Navbar />

      {/* Products Section */}
      <div className="container mt-5">

        <h2 className="text-center fw-bold mb-4">
          All Products
        </h2>

        {loading && (
          <p className="text-center">Loading products...</p>
        )}

        <div className="row">

          {filteredProducts.map((product) => (

            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>

              <div className="card shadow-sm h-100">

                <img
                  src={product.imageUrl || "https://via.placeholder.com/200"}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "200px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body text-center">

                  <h5 className="card-title">
                    {product.name}
                  </h5>

                  <p className="text-muted">
                    {product.description?.substring(0, 60)}...
                  </p>

                  <p className="text-success fw-bold">
                    ₹{product.price}
                  </p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>

                  <button
                    className="btn btn-outline-danger w-100 mt-2"
                    onClick={() => addToWishlist(product)}
                  >
                    ❤️ Add to Wishlist
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2026 MyStore | Built with React + Spring Boot
      </footer>

    </div>

  );
};

export default Products;