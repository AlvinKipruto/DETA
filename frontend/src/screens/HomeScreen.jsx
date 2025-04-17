import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homescreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to Inventory Management App</h1>
      <button className="button" onClick={handleLogout} aria-label="Logout from the app">
        <span className="buttonText">Logout</span>
      </button>
    </div>
  );
};

export default HomeScreen;
