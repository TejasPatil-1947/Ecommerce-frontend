import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../Services/AuthService";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      await authService.register(form);

      toast.success("Registration successful 🎉");

      navigate("/login");

    } catch (error) {

      console.error(error);
      toast.error("Registration failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#20c997,#0d6efd)"
      }}
    >

      <div
        className="card shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px",
          padding: "30px"
        }}
      >

        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Create Account</h3>
        </div>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 text-white fw-semibold"
            style={{
              background: "linear-gradient(90deg,#0d6efd,#20c997)",
              borderRadius: "20px"
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default Register;