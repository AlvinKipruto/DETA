import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signupscreen.css";

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
      // Replace with your custom signup API call
      // Example: const response = await fetch("/api/signup", { method: "POST", body: JSON.stringify({ email, password }) });
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