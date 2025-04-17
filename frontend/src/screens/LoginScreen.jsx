import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginscreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Replace with your custom login API call
      // Example: const response = await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
      alert("Success: Logged in successfully!");
      navigate("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
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
      <button className="button" onClick={handleLogin}>
        <span className="buttonText">Login</span>
      </button>
      <button 
        className="linkButton" 
        onClick={() => navigate("/signup")}
      >
        <span className="linkText">Don't have an account? Sign Up</span>
      </button>
    </div>
  );
};

export default LoginScreen;