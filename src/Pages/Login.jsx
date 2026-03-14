import React, { useState } from "react";
import { authService } from "../Services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    setLoading(true);

    try {

      const token = await authService.login(email, password);

      localStorage.setItem("token", token);

      const user = await authService.currentUser();

      toast.success("Login successful 🎉");

      navigate("/");

    } catch (error) {

      toast.error("Invalid email or password");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0d6efd,#20c997)"
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
          <h3 className="fw-bold text-primary">Login</h3>
        </div>

        <form>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="btn w-100 text-white fw-semibold"
            style={{
              background: "linear-gradient(90deg,#0d6efd,#20c997)",
              borderRadius: "20px"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-3">
            <small>
              Don’t have an account?{" "}
              <Link to="/register" className="fw-semibold text-primary">
                Register
              </Link>
            </small>
          </div>

        </form>

      </div>

    </div>
  );
};

export default Login;