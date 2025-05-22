import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaReceipt,
  FaTrash,
} from "react-icons/fa";
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/purchasesscreen.css";

const BASE_URL = "http://localhost:5000/api";

const PurchasesScreen = () => {
  const [purchases, setPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState("Purchases");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`${BASE_URL}/purchases`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          alert("Failed to fetch purchases.");
          return;
        }

        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        alert("Error loading purchases.");
      }
    };

    fetchPurchases();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purchase?")) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/purchases/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete purchase.");
        return;
      }

      setPurchases(purchases.filter((p) => p.id !== id));
      alert("Purchase deleted successfully!");
    } catch (error) {
      alert("Error deleting purchase.");
    }
  };

  const sideNavItems = [
    {
      title: "Home",
      path: "/home",
      icon: <FaHome className="nav-icon" />,
      hasSubmenu: true,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: <FaBox className="nav-icon" />,
      hasSubmenu: true,
    },
    {
      title: "Sales",
      path: "/sales",
      icon: <FaShoppingCart className="nav-icon" />,
      hasSubmenu: true,
    },
    {
      title: "Purchases",
      path: "/purchases",
      icon: <FaReceipt className="nav-icon" />,
      hasSubmenu: true,
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
            className={`sidebar-item ${activeTab === item.title ? "active" : ""}`}
            onClick={() => {
              setActiveTab(item.title);
              navigate(item.path);
            }}
          >
            <div className="sidebar-item-content">
              {item.icon}
              <span className="sidebar-item-title">{item.title}</span>
            </div>
            {item.hasSubmenu && (
              <span className="submenu-indicator">
                <HiOutlineChevronRight />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="page-header">
          <h1>Purchases</h1>
          <p>View and manage your purchases</p>
        </div>

        <div className="purchases-table-container">
          {purchases.length === 0 ? (
            <p>No purchases found.</p>
          ) : (
            <table className="purchases-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price (KES)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map(({ id, productName, quantity, price }) => (
                  <tr key={id}>
                    <td>{productName}</td>
                    <td>{quantity}</td>
                    <td>{price.toFixed(2)}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(id)}
                        aria-label="Delete purchase"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasesScreen;
