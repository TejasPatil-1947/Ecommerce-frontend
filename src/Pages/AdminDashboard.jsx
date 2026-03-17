import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CategoryService from "../Services/CategoryService";
import { productService } from "../Services/ProductService";
import orderService from "../Services/OrderService";
import AddressService from "../Services/AddressService";
import addressService from "../Services/AddressService";
import userService from "../Services/UserService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [category, setCategory] = useState({
    name: "",
    description: "",
    status: true,
  });
  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users", error);
    }
  };
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [oldCategory, setOldCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  });
  const viewOrder = async (order) => {
    setSelectedOrder(order);

    try {
      const res = await addressService.getAddressByUser(order.user.id);
      console.log(res, "address");
      setAddress(res);
    } catch (error) {
      console.error("Error fetching address", error);
    }
  };
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
    loadOrders();
    loadCategories();
    loadUsers();
  }, []);

  const toggleUserStatus = async (userId, status) => {
    try {
      if (status === "ACTIVE") {
        await userService.deactivateUser(userId);
        alert("User deactivated");
      } else {
        await userService.activateUser(userId);
        alert("User activated");
      }

      loadUsers();
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };

  // Load Products
  const loadProducts = async () => {
    const data = await productService.getAllProducts();
    setProducts(data);
  };

  // Load Orders
  const loadOrders = async () => {
    const data = await orderService.getAllOrders();
    setOrders(data);
  };
  // Update Order Status
  const changeOrderStatus = async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      loadOrders();
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };
  // Load Categories
  const loadCategories = async () => {
    const data = await CategoryService.getAllCategories();
    setCategories(data);
  };

  // Product change
  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Category change
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;

    setCategory({
      ...category,
      [name]: name === "status" ? value === "true" : value,
    });
  };

  // activate category
  const activateCategory = async (id) => {
    await CategoryService.activateCategory(id);

    alert("Category activated");

    loadCategories();
  };

  // Create Category
  const createCategory = async () => {
    if (!category.name) {
      alert("Category name required");
      return;
    }

    await CategoryService.createCategory(category);

    setCategory({
      name: "",
      description: "",
      status: true,
    });

    loadCategories();
  };

  // deactivate category
  const deactivateCategory = async () => {
    if (!oldCategory || !newCategory) {
      alert("Select both categories");
      return;
    }

    await CategoryService.deactivateCategory(oldCategory, newCategory);

    alert("Category deactivated and products moved");

    setOldCategory("");
    setNewCategory("");
    setShowDeactivate(false);

    loadCategories();
    loadProducts();
  };
  // Add Product
  const addProduct = async () => {
    if (!selectedCategory) {
      alert("Select category");
      return;
    }

    await productService.createProduct(selectedCategory, product);

    setProduct({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      quantity: "",
    });

    setSelectedCategory("");

    loadProducts();
  };

  // Delete Product
  const deleteProduct = async (id) => {
    await productService.deleteProduct(id);
    loadProducts();
  };

  // Edit Product
  const handleEdit = (p) => {
    setEditingId(p.id);

    setProduct({
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl,
      quantity: p.quantity,
    });

    // VERY IMPORTANT
    setSelectedCategory(p.category.id);
  };
  // Update Product
  const updateProduct = async () => {
    await productService.updateProduct(editingId, selectedCategory, product);

    setEditingId(null);

    setProduct({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      quantity: "",
    });

    setSelectedCategory("");

    loadProducts();
  };

  const filteredOrders =
    statusFilter === "ALL"
      ? orders
      : orders.filter((o) => o.status === statusFilter);
  return (
    <div className="container-fluid">
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-center fw-bold mb-4">Admin Dashboard</h2>

        {/* DASHBOARD STATS */}

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Total Products</h5>
                <h3>{products.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Total Orders</h5>
                <h3>{orders.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow">
              <div className="card-body">
                <h5>Total Categories</h5>
                <h3>{categories.length}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY FORM */}

        <div className="card shadow mb-4">
          <div className="card-header bg-secondary text-white fw-bold">
            Create Category
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Category Name"
                  value={category.name}
                  onChange={handleCategoryChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={category.description}
                  onChange={handleCategoryChange}
                />
              </div>

              <div className="col-md-3">
                <select
                  name="status"
                  className="form-control"
                  value={category.status}
                  onChange={handleCategoryChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </select>
              </div>

              <div className="col-md-2 d-grid">
                <button className="btn btn-success" onClick={createCategory}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header bg-dark text-white fw-bold">
            All Categories
          </div>

          <div className="card-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>

                    <td>{c.description}</td>

                    <td>
                      {c.status ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">Inactive</span>
                      )}
                    </td>

                    <td>
                      {c.status ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            setShowDeactivate(true);
                            setOldCategory(c.id);
                          }}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => activateCategory(c.id)}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showDeactivate && (
              <div className="card shadow mb-4">
                <div className="card-header bg-danger text-white">
                  Deactivate Category
                </div>

                <div className="card-body">
                  <div className="row g-3">
                    {/* Old Category */}

                    <div className="col-md-5">
                      <label className="form-label">Old Category</label>

                      <select
                        className="form-control"
                        value={oldCategory}
                        onChange={(e) => setOldCategory(e.target.value)}
                      >
                        <option value="">Select Old Category</option>

                        {categories
                          .filter((c) => c.status)
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* New Category */}

                    <div className="col-md-5">
                      <label className="form-label">Move Products To</label>

                      <select
                        className="form-control"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      >
                        <option value="">Select New Category</option>

                        {categories
                          .filter((c) => c.status)
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Button */}

                    <div className="col-md-2 d-grid align-items-end">
                      <button
                        className="btn btn-danger"
                        onClick={deactivateCategory}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* PRODUCT FORM */}

        <div className="card shadow mb-4">
          <div className="card-header bg-primary text-white fw-bold">
            {editingId ? "Update Product" : "Add Product"}
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <select
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>

                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.status ? "(Active)" : "(Inactive)"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={product.name}
                  onChange={handleProductChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={product.price}
                  onChange={handleProductChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  className="form-control"
                  placeholder="Quantity"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleProductChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={product.description}
                  onChange={handleProductChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Image URL"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleProductChange}
                />
              </div>

              <div className="col-md-12 text-end">
                {editingId ? (
                  <button className="btn btn-warning" onClick={updateProduct}>
                    Update Product
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={addProduct}>
                    Add Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS TABLE */}

        <div className="card shadow mb-4">
          <div className="card-header bg-dark text-white fw-bold">
            All Products
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>

                    <td>
                      <span className="badge bg-info">{p.category?.name}</span>
                    </td>

                    <td>₹{p.price}</td>

                    <td>{p.quantity}</td>

                    <td>
                      <button onClick={() => handleEdit(p)}>Edit</button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteProduct(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}

        {/* USERS TABLE */}

        <div className="card shadow mb-4">
          <div className="card-header bg-info text-white fw-bold">
            All Users
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>

                    <td>
                      {u.status === "ACTIVE" ? (
                        <span className="badge bg-success">ACTIVE</span>
                      ) : (
                        <span className="badge bg-danger">INACTIVE</span>
                      )}
                    </td>

                    <td>
                      {u.status === "ACTIVE" ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => toggleUserStatus(u.id, u.status)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => toggleUserStatus(u.id, u.status)}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ORDERS TABLE */}

        <div className="card shadow">
          <div className="mb-3">
            <label className="me-2 fw-bold">Filter Orders:</label>

            <select
              className="form-control w-auto d-inline"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="card-header bg-success text-white fw-bold">
            All Orders
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.user?.name}</td>
                    <td>₹{o.totalAmount}</td>

                    <td>
                      <select
                        className="form-control"
                        value={o.status}
                        onChange={(e) =>
                          changeOrderStatus(o.id, e.target.value)
                        }
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => viewOrder(o)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedOrder && (
              <div className="modal show fade d-block">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Order Details</h5>
                      <button
                        className="btn-close"
                        onClick={() => setSelectedOrder(null)}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <p>
                        <strong>Order ID:</strong> {selectedOrder.id}
                      </p>

                      <p>
                        <strong>Date:</strong> {selectedOrder.date}
                      </p>

                      <p>
                        <strong>Status:</strong> {selectedOrder.status}
                      </p>

                      <p>
                        <strong>Total Amount:</strong> ₹
                        {selectedOrder.totalAmount}
                      </p>

                      <p>
                        <strong>Customer Name:</strong>{" "}
                        {selectedOrder.user?.name}
                      </p>

                      <p>
                        <strong>Shipping Address:</strong>
                        <br />
                        {address && address.length > 0 ? (
                          <>
                            {address[0].street}, {address[0].city},{" "}
                            {address[0].state} - {address[0].pincode}
                          </>
                        ) : (
                          "No Address"
                        )}
                      </p>
                    </div>

                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedOrder(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
