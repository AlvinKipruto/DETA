import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginscreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would verify credentials with your backend
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem('authToken', 'dummy-auth-token');
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button">
          <span className="buttonText">Login</span>
        </button>
      </form>
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