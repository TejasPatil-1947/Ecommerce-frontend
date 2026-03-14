import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🛍 MyStore
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Menu */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold position-relative"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold position-relative"
                to="/Orders"
              >
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold position-relative"
                to="/wishlist"
              >
                Wishlist
              </Link>
            </li>

             <li className="nav-item">
              <Link
                className="nav-link fw-semibold position-relative"
                to="/profile"
              >
                Profile
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          {/* Right Menu */}
          <ul className="navbar-nav align-items-center">
            {user ? (
              <>
                <li className="nav-item text-white me-3">
                  👋 Hello, <span className="fw-bold">{user.name}</span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-success btn-sm px-3" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
