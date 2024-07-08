import React, { useState } from "react";
import "./SignUpForm.css";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [initial_Weight, setInitialWeight] = useState("");
  const [target_Weight, setTargetWeight] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
            age,
            gender,
            height,
            initial_Weight,
            target_Weight,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // save the token in localStorage
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign Up</h1>
        <div className="signup__input-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="signup__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup__input-wrapper">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="signup__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="signup__input-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="signup__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup__input-wrapper">
          <label htmlFor="password-confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password-confirmation"
            className="signup__input"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div className="signup__input-wrapper-double">
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              className="signup__input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              className="signup__input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>
        <div className="signup__input-wrapper-double">
          <div>
            <label htmlFor="initial-weight">Initial Weight:</label>
            <input
              type="number"
              id="initial-weight"
              className="signup__input--small"
              value={initial_Weight}
              onChange={(e) => setInitialWeight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="target-weight">Target Weight:</label>
            <input
              type="number"
              id="target-weight"
              className="signup__input--small"
              value={target_Weight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="signup__button">
          Sign Up
        </button>
        <p className="signup__login-link">
          Already have an account?{" "}
          <Link to="/login" className="signup__login-link-text">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
export default SignUp;