import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaReceipt, FaSignOutAlt, FaChartBar, FaFile, FaCog } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import { HiOutlineChevronRight } from "react-icons/hi";
import "../styles/inventoryscreen.css";

const InventoryScreen = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    price: "",
    category: ""
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Inventory");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };
  
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items));
  }, [items]);
  
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    setItems([...items, {
      ...newItem,
      id: Date.now(),
      quantity: parseInt(newItem.quantity) || 0,
      price: parseFloat(newItem.price) || 0
    }]);
    
    setNewItem({ name: "", quantity: "", price: "", category: "" });
  };
  
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
      {/* Side Navigation */}
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

      {/* Main Content */}
      <div className="main-content">
        <header className="main-header">
          <h1> My Inventory </h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        <div className="inventory-content">
          <form onSubmit={handleAddItem} className="add-item-form">
            <h2>Add New Item</h2>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="form-input"
              />
            </div>
            <button type="submit" className="add-btn">Add Item</button>
          </form>

          <div className="inventory-list">
            <h2>Inventory Items</h2>
            {filteredItems.length > 0 ? (
              <>
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.category}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="no-items">No items found</p>
            )}
          </div>
        </div>

        <footer className="main-footer">
          <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
        </footer>
      </div>
    </div>
  );
};

export default InventoryScreen;