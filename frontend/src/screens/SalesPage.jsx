import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaReceipt, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/salespage.css";

const SalesPage = () => {
  const [productName, setProductName] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [activeTab, setActiveTab] = useState("Sales");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  const sideNavItems = [
    {
      title: "Home",
      path: "/home",
      icon: <FaHome className="nav-icon" />,
      hasSubmenu: true
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <FaBox className="nav-icon" />,
      hasSubmenu: true
    },
    {
      title: "Sales",
      path: "/sales",
      icon: <FaShoppingCart className="nav-icon" />,
      hasSubmenu: true
    },
    {
      title: "Purchases",
      path: "/purchases",
      icon: <FaReceipt className="nav-icon" />,
      hasSubmenu: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const saleEntry = {
      productName,
      quantity: parseInt(quantitySold, 10),
      price: parseFloat(soldPrice),
      date: new Date().toISOString(),
    };

    const existingData = JSON.parse(localStorage.getItem("purchases")) || [];
    existingData.push(saleEntry);
    localStorage.setItem("purchases", JSON.stringify(existingData));

    // Clear form
    setProductName("");
    setQuantitySold("");
    setSoldPrice("");

    // Show success message or notification
    alert("Sale recorded successfully!");
    
    // Navigate to purchases page
    navigate("/purchases");
  };
  
  const handleCancelClick = () => {
    // Display confirmation dialog
    if (window.confirm("Are you sure you want to cancel this entry? Any unsaved data will be lost.")) {
      // Clear the form fields if user confirms
      setProductName("");
      setQuantitySold("");
      setSoldPrice("");
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="app-logo">
          <h1>DETA</h1>
        </div>
        {sideNavItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${activeTab === item.title ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(item.title);
              if (item.action) {
                item.action();
              } else {
                navigate(item.path);
              }
            }}
          >
            <div className="sidebar-item-content">
              {item.icon}
              <span className="sidebar-item-title">{item.title}</span>
            </div>
            {item.hasSubmenu && <span className="submenu-indicator"><HiOutlineChevronRight /></span>}
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="page-header">
          <h1>Sales Management</h1>
          <p>Record your sales</p>
        </div>
        
        <div className="sales-container">
          <div className="card sales-card">
            <h2 className="card-title">Record Sale</h2>
            <form className="sales-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantitySold">Quantity Sold</label>
                  <input
                    id="quantitySold"
                    type="number"
                    min="1"
                    value={quantitySold}
                    onChange={(e) => setQuantitySold(e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="soldPrice">Sold Price </label>
                  <input
                    id="soldPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={soldPrice}
                    onChange={(e) => setSoldPrice(e.target.value)}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="submit-button">Record Sale</button>
              </div>
            </form>
          </div>
          
          <div className="card quick-info-card">
            <h3>Recent Sales</h3>
            <p>View your recent sales activity at a glance</p>
            <button className="view-all-button" onClick={() => navigate("/purchases")}>
              View All Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;