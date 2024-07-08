import React, { useState } from "react";
import "./SignUpForm.css";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [initialWeight, setInitialWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
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
            initial_Weight: initialWeight,
            target_Weight: targetWeight,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="signup">
      <button className="back-button" onClick={handleBackClick}>
        <ArrowBackIcon />
      </button>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="message">Signup now and get full access to our web app.</p>

          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Username</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>

          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <span>Confirm Password</span>
            </label>
          </div>

          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="number"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>Age</span>
            </label>

            <label>
              <select
                required
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <span>Gender</span>
            </label>
          </div>

          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="number"
                className="input"
                value={initialWeight}
                onChange={(e) => setInitialWeight(e.target.value)}
              />
              <span>Initial Weight</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                type="number"
                className="input"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
              />
              <span>Target Weight</span>
            </label>
          </div>

          <button className="submit">
            Sign Up
          </button>

          <p className="signin">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
