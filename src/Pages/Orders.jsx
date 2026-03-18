import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import orderService from "../Services/OrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await orderService.cancelOrder(orderId);
      alert("Order cancelled");
      loadOrders();
    } catch (error) {
      alert("Cannot cancel shipped order");
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrdersByUser(userId);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h2 className="fw-bold mb-4">My Orders</h2>

        {loading && <p>Loading orders...</p>}
        {!loading && orders.length === 0 && <h5>No orders found</h5>}

        {orders.map((order) => (
          <div key={order.id} className="card shadow mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">Order ID: {order.id}</h5>

                  <p className="text-muted mb-1">Date: {order.date}</p>

                  {/* ✅ ORDER STATUS */}
                  <p className="mb-1">
                    Order Status:
                    <span
                      className={`badge ms-2 ${
                        order.status === "CANCELLED"
                          ? "bg-danger"
                          : order.status === "DELIVERED"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>

                  {/* ✅ PAYMENT STATUS */}
                  {order.payment && (
                    <p className="mb-1">
                      Payment Status:
                      <span
                        className={`badge ms-2 ${
                          order.payment.status === "REFUNDED"
                            ? "bg-success"
                            : order.payment.status === "PAID"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {order.payment.status}
                      </span>
                    </p>
                  )}

                  {/* ✅ REFUND MESSAGE */}
                  {order.status === "CANCELLED" &&
                    order.payment?.status === "REFUNDED" && (
                      <p className="text-success fw-bold mt-2">
                        ✅ ₹{order.totalAmount} Refunded Successfully
                      </p>
                    )}

                  {/* ✅ CANCEL BUTTON */}
                  {order.status === "SHIPPED" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

                <div className="text-end">
                  <h5 className="text-success fw-bold">
                    ₹{order.totalAmount}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;