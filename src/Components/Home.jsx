import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productService } from "../Services/ProductService";
import CategoryService from "../Services/CategoryService";
import Navbar from "../Components/Navbar";

function Home() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const productData = await productService.getAllProducts();
        const categoryData = await CategoryService.getAllCategories();

        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const loggedUser = sessionStorage.getItem("user");

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // Filter by category
  const handleCategoryClick = async (name) => {
    setLoading(true);

    try {
      const data = await productService.getProductsByCategoryName(name);
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load category products");
    } finally {
      setLoading(false);
    }
  };

  // Show all products
  const showAllProducts = async () => {
    setLoading(true);

    const data = await productService.getAllProducts();

    setProducts(data);

    setLoading(false);
  };

  const addToCart = (product) => {
    toast.success(product.name + " added to cart 🛒");
  };

  // Search filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Buttons */}

      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button className="btn btn-dark" onClick={showAllProducts}>
            All
          </button>

          {categories
            .filter((c) => c.name !== "Deactive")
            .map((c) => (
              <button
                key={c.id}
                className="btn btn-outline-primary"
                onClick={() => handleCategoryClick(c.name)}
              >
                {c.name}
              </button>
            ))}
        </div>
      </div>

      {/* Products */}

      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-bold">Our Products</h2>

        {loading && <p className="text-center">Loading products...</p>}

        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div
                className="card shadow-sm h-100 border-0"
                style={{ borderRadius: "12px" }}
              >
                <img
                  src={product.imageUrl || "https://via.placeholder.com/200"}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{product.name}</h5>

                  <p className="text-muted small">
                    {product.description?.substring(0, 60)}...
                  </p>

                  <p className="text-success fw-bold fs-5">₹{product.price}</p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
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
}

export default Home;
