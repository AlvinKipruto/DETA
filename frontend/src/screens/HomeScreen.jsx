import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homescreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to Inventory Management</h1>
      <div className="button-group">
        <button 
          className="button inventory-btn"
          onClick={() => navigate("/inventory")}
        >
          Manage Inventory
        </button>
        <button 
          className="button sales-btn" 
          onClick={() => navigate("/sales")}
        >
          Sales
        </button>
        <button 
          className="button purchases-btn" 
          onClick={() => navigate("/purchases")}
        >
          Purchases
        </button>
        <button 
          className="button logout-btn" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
