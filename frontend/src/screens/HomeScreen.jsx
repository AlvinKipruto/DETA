import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaReceipt, FaSignOutAlt, FaChartBar, FaCog, FaBoxes, FaDollarSign, FaTags } from "react-icons/fa"; // Added FaBoxes, FaDollarSign, FaTags
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/homescreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

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
      description: "Oversee all your products and stock levels."
    },
    {
      title: "Process Sales",
      path: "/sales",
      icon: <FaShoppingCart className="dashboard-icon" />,
      className: "sales-btn",
      description: "Handle customer sales."
    },
    {
      title: "Manage Purchases",
      path: "/purchases",
      icon: <FaReceipt className="dashboard-icon" />,
      className: "purchase-btn",
      description: "Record incoming stock and supplier information."
    },
    // {
    //   title: "View Reports", // New item for reports
    //   path: "/reports",
    //   icon: <FaChartBar className="dashboard-icon" />,
    //   className: "reports-btn",
    //   description: "Analyze business performance and trends."
    // }
  ];

  const quickStats = [
    {
      title: "Total Products",
      value: "1,245", // Example data
      icon: <FaBoxes className="stat-icon" />,
      color: "#4CAF50" // Example color
    },
    {
      title: "Today's Sales",
      value: "$5,320", // Example data
      icon: <FaDollarSign className="stat-icon" />,
      color: "#2196F3" // Example color
    },
    {
      title: "Low Stock Items",
      value: "15", // Example data
      icon: <FaTags className="stat-icon" />,
      color: "#FF9800" // Example color
    }
  ];

  const sideNavItems = [
    {
      title: "Home",
      path: "/home",
      icon: <FaHome className="nav-icon" />,
      hasSubmenu: false // Changed to false for simplicity on home
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
    // {
    //   title: "Reports", // Added Reports to side nav
    //   path: "/reports",
    //   icon: <FaChartBar className="nav-icon" />,
    //   hasSubmenu: true
    // },
    // {
    //   title: "Settings",
    //   path: "/settings",
    //   icon: <FaCog className="nav-icon" />,
    //   hasSubmenu: true
    // },
    {
      title: "Logout",
      action: handleLogout,
      icon: <FaSignOutAlt className="nav-icon" />,
      hasSubmenu: true
    }
  ];

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="app-logo">
          <h1>DETA</h1>
        </div>
        <nav className="sidebar-nav">
          {sideNavItems.map((item, index) => (
            <div
              key={index}
              className={`sidebar-item ${activeTab === item.title ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.title);
                if (item.path) {
                  navigate(item.path);
                } else if (item.action) {
                  item.action();
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
        </nav>
      </div>

      <div className="main-content">
        <header className="main-header">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome back to DETA!</h1>
            <p className="current-date">{currentDate}</p>
          </div>
          {/* Add a user profile/settings icon or quick search bar here if desired */}
        </header>

        {/* <section className="quick-stats-section">
          <h2>At a Glance</h2>
          <div className="quick-stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ '--card-color': stat.color }}>
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-title">{stat.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section> */}
        
        <section className="dashboard-actions-section">
          <h2>Quick Actions</h2>
          <div className="dashboard-grid">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                className={`dashboard-item ${item.className}`}
                onClick={item.action ? item.action : () => navigate(item.path)}
              >
                <div className="dashboard-item-icon-wrapper">
                  {item.icon}
                </div>
                <h3 className="dashboard-item-title">{item.title}</h3>
                <p className="dashboard-item-description">{item.description}</p>
                <span className="dashboard-item-arrow"><HiOutlineChevronRight /></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
