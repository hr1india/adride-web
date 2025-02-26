import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants"; 
import "../assets/styles/login.css";
import Logo from "../assets/files/Group 1.jpg";
import EyeOpen from "../assets/files/pajamas_eye@2x.svg";  

const ADMIN_URL = `${BASE_URL}/api/admin`;

const LoginAdmin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken"); 
    if (token) {
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  }, [setIsAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${ADMIN_URL}/login`, 
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        if (rememberMe) {
          localStorage.setItem("adminToken", response.data.token);
        }
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Try again!");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="admin">
          <img src={Logo} alt="Logo" width="150" height="100" />
        </div>
        <div className="heading">Welcome Back!</div>
        <div className="formone">
          <div className="para">Please enter your details</div>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-group password-wrapper">
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field password-input"
                  id="passwordField"
                  required
                  autoComplete="new-password"
                />
                <div className="eye-container" onClick={() => setPasswordVisible(!passwordVisible)}>
                  <img 
                    src={EyeOpen}  
                    alt="Toggle Password Visibility" 
                    className={`eye-icon ${passwordVisible ? "active" : ""}`}  
                    width="35" 
                    height="35" 
                  />
                </div>
              </div>
            </div>

            <div className="form-group checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
            </div>

            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
