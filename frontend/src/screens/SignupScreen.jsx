import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signupscreen.css";

const BASE_URL = "http://localhost:5000/api";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Error: Passwords do not match.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.message || "Signup failed"}`);
        return;
      }

      alert("Success: Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Sign Up</h1>
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="button" onClick={handleSignup}>
        <span className="buttonText">Sign Up</span>
      </button>
      <button
        className="linkButton"
        onClick={() => navigate("/login")}
      >
        <span className="linkText">Already have an account? Login</span>
      </button>
    </div>
  );
};

export default SignupScreen;
