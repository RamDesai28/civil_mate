import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Clear form data when the component is mounted
  useEffect(() => {
    setUsername("");  // Clear username field
    setPassword("");  // Clear password field
    setErrorMessage(""); // Clear any previous error messages
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("token", data.token); // Save JWT token to localStorage
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
