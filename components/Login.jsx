import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { Link } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="login-page">
      <div className="form">
        <h2>Welcome Again</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">login</button>
          <p className="signup__login-link">
          Dont have an account?{" "}
          <Link to="/signup" className="signup__login-link-text">
            Sign Up
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
}
export default Login;