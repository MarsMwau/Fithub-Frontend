import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      localStorage.setItem("token", data.token);

      console.log("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="login-page">
      <button className="back-button" onClick={handleBackClick}>
        <ArrowBackIcon />
      </button>
      <div className="form">
        <h2>Sign In</h2>
        <p>Sign in now and get back to your goal.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">login</button>
          <p className="signup-login">
            Dont have an account?{" "}
            <Link to="/signup" className="signup-login-link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
