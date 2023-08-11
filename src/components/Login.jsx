import React, { useState } from "react";
// import "./login.css";
// import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

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

      // save the token in localStorage
      localStorage.setItem("token", data.token);

      console.log('token', data.token);
      // Redirect to the feed page
      // navigate("/feed");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <p>Welcome Again</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">login</button>
          
        </form>
      </div>
    </div>
  );
}

export default Login;