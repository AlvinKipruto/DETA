import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaReceipt,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/salespage.css";

const BASE_URL = "http://localhost:5000/api";

const SalesPage = () => {
  const [productName, setProductName] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const [activeTab, setActiveTab] = useState("Sales");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleEntry = {
      productName,
      quantity: parseInt(quantitySold, 10),
      price: parseFloat(soldPrice),
    };

    try {
      const response = await fetch(`${BASE_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleEntry),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Failed to record sale");
        return;
      }

      setProductName("");
      setQuantitySold("");
      setSoldPrice("");
      alert("Sale recorded successfully!");
      navigate("/purchases");
    } catch (error) {
      alert("Error recording sale. Please try again.");
    }
  };

  const handleCancelClick = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this entry? Any unsaved data will be lost."
      )
    ) {
      setProductName("");
      setQuantitySold("");
      setSoldPrice("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const sideNavItems = [
    {
      title: "Home",
      path: "/home",
      icon: <FaHome className="nav-icon" />,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <FaBox className="nav-icon" />,
    },
    {
      title: "Sales",
      path: "/sales",
      icon: <FaShoppingCart className="nav-icon" />,
    },
    {
      title: "Purchases",
      path: "/purchases",
      icon: <FaReceipt className="nav-icon" />,
    },
    {
      title: "Logout",
      path: "#",
      icon: <FaSignOutAlt className="nav-icon" />,
      action: handleLogout,
    },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="app-logo">
          <h1>DETA</h1>
        </div>
        {sideNavItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${activeTab === item.title ? "active" : ""}`}
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
            {item.path !== "#" && (
              <span className="submenu-indicator">
                <HiOutlineChevronRight />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <h1>Sales Management</h1>
          <p>Record your sales</p>
        </div>

        <div className="sales-container">
          {/* Sales Entry Form */}
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
                  <label htmlFor="soldPrice">Sold Price</label>
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
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Record Sale
                </button>
              </div>
            </form>
          </div>

          {/* Quick Info Card */}
          <div className="card quick-info-card">
            <h3>Recent Sales</h3>
            <p>View your recent sales activity at a glance</p>
            <button
              className="view-all-button"
              onClick={() => navigate("/purchases")}
            >
              View All Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
