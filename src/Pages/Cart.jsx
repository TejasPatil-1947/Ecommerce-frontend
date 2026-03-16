import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import cartService from "../Services/CartService";
import Navbar from "../Components/Navbar";
import orderService from "../Services/OrderService";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await cartService.viewCart(userId);
      console.log("Cart Data:", data);
      setCartItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (productId, quantity) => {

    try {

      // if quantity becomes 0 remove item
      if (quantity < 1) {
        await cartService.removeFromCart(userId, productId);
      } else {
        await cartService.updateQuantity(userId, productId, quantity);
      }

      loadCart();

    } catch (error) {
      console.error(error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const handleCheckout = async () => {

    try {

      const order = await orderService.createOrder(userId);

      const options = {
        key: order.key,
        amount: order.amount * 100,
        currency: "INR",
        name: "My Ecommerce Store",
        description: "Order Payment",
        order_id: order.razorpayOrderId,

        handler: async function (response) {

          try {

            await orderService.verifyPayment(
              order.orderId,
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            alert("Payment Successful!");
            loadCart();

          } catch (error) {
            console.error(error);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "customer@gmail.com",
          contact: "9999999999"
        },

        theme: {
          color: "#0d6efd"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    }
  };

  return (
    <div>

      <Navbar />

      <div className="container mt-5">

        <h2 className="mb-4 fw-bold">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (

          <div className="text-center mt-5">
            <h4>Your cart is empty</h4>
            <Link to="/" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>

        ) : (

          <div className="card shadow">

            <div className="card-body">

              <table className="table table-hover align-middle">

                <thead className="table-dark">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th style={{ width: "200px" }}>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>

                  {cartItems.map((item) => (

                    <tr key={item.id}>

                      <td className="fw-semibold">
                        {item.product.name}
                      </td>

                      <td>₹{item.product.price}</td>

                      <td>

                        <div className="d-flex align-items-center">

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                          >
                            -
                          </button>

                          <span className="mx-3 fw-bold">
                            {item.quantity}
                          </span>

                          <button
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </td>

                      <td className="fw-bold text-success">
                        ₹{item.product.price * item.quantity}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              <div className="d-flex justify-content-between align-items-center mt-4">

                <h4 className="fw-bold">
                  Total: ₹{getTotalPrice()}
                </h4>

                <button
                  className="btn btn-success btn-lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Cart;