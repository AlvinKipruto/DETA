import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaReceipt, FaChartBar, FaFile, FaCog, FaTrash } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/purchasesscreen.css";

const PurchasesScreen = () => {
  const [purchases, setPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState("Purchases");
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, index: null });
  const navigate = useNavigate();

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    setPurchases(storedPurchases);
  }, []);

  const handleDelete = (index) => {
    setDeleteConfirmation({ show: true, index });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.index !== null) {
      const updatedPurchases = [...purchases];
      updatedPurchases.splice(deleteConfirmation.index, 1);
      setPurchases(updatedPurchases);
      
      // Update localStorage
      localStorage.setItem("purchases", JSON.stringify(updatedPurchases));
      
      // Close confirmation dialog
      setDeleteConfirmation({ show: false, index: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, index: null });
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
    },
  ];

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
              navigate(item.path);
            }}
          >
            <div className="sidebar-item-content">
              {item.icon}
              <span className="sidebar-item-title">{item.title}</span>
            </div>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            {item.hasSubmenu && <span className="submenu-indicator"><HiOutlineChevronRight /></span>}
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="content-wrapper">
          <h2 className="purchases-title">Purchase Records</h2>
          <div className="table-container">
            <table className="purchases-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity Sold</th>
                  <th>Price Sold</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr key={index}>
                    <td>{purchase.productName}</td>
                    <td>{purchase.quantity}</td>
                    <td>${purchase.price.toFixed(2)}</td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button className="back-button" onClick={() => navigate("/sales")}>Back</button>
            <button className="home-btn" onClick={() => navigate("/")}>Home</button>
          </div>
        </div>

        {deleteConfirmation.show && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this purchase record?</p>
              <div className="confirmation-buttons">
                <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                <button className="confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasesScreen;