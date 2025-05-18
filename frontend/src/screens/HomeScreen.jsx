import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaReceipt, FaSignOutAlt, FaChartBar, FaFile, FaCog } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/homescreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  const dashboardItems = [
    {
      title: "Manage Inventory",
      path: "/inventory",
      icon: <FaBox className="dashboard-icon" />,
      className: "inventory-btn",
    },
    {
      title: "Sales",
      path: "/sales",
      icon: <FaShoppingCart className="dashboard-icon" />,
      className: "sales-btn",
    },
    {
      title: "Purchases",
      path: "/purchases",
      icon: <FaReceipt className="dashboard-icon" />,
      className: "purchase-btn",
    },
    {
      title: "Logout",
      action: handleLogout,
      icon: <FaSignOutAlt className="dashboard-icon" />,
      className: "logout-btn"
    }
  ];

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
    {
      title: "Logout",
      action: handleLogout,
      icon: <FaSignOutAlt className="nav-icon" />,
      hasSubmenu: false
    }
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
        <h1 className="dashboard-title">Welcome to DETA</h1>

        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className={`dashboard-item ${item.className}`}
              onClick={item.action ? item.action : () => navigate(item.path)}
            >
              {item.icon}
              <span className="dashboard-item-title">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;