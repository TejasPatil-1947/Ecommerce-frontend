import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import wishlistService from "../Services/WishlistService";

const Wishlist = () => {

  const [products, setProducts] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {

    try {

      const data = await wishlistService.getWishlist(userId);

      setProducts(data.products || []);

    } catch (error) {
      console.error(error);
    }
  };

  const removeProduct = async (productId) => {

    await wishlistService.removeProduct(userId, productId);

    loadWishlist();
  };

  return (
    <div>

      <Navbar />

      <div className="container mt-5">

        <h2 className="fw-bold mb-4">My Wishlist ❤️</h2>

        <div className="row">

          {products.map((product) => (

            <div className="col-md-3 mb-4" key={product.id}>

              <div className="card shadow-sm h-100">

                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  style={{height:"200px",objectFit:"cover"}}
                />

                <div className="card-body text-center">

                  <h5>{product.name}</h5>

                  <p className="text-success fw-bold">
                    ₹{product.price}
                  </p>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => removeProduct(product.id)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Wishlist;