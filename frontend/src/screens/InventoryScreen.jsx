import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaReceipt
} from "react-icons/fa";
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
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, id: null, name: null });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
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

    const newQuantity = parseInt(newItem.quantity) || 0;
    const newPrice = parseFloat(newItem.price) || 0;

    const existingItemIndex = items.findIndex(
      item => item.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + newQuantity,
        price: newPrice,
        category: newItem.category || updatedItems[existingItemIndex].category
      };
      setItems(updatedItems);
    } else {
      setItems([...items, {
        ...newItem,
        id: Date.now(),
        quantity: newQuantity,
        price: newPrice
      }]);
    }

    setNewItem({ name: "", quantity: "", price: "", category: "" });
  };

  const handleDeleteItem = (id, itemName) => {
    setDeleteConfirmation({ show: true, id, name: itemName });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.id !== null) {
      setItems(items.filter(item => item.id !== deleteConfirmation.id));
      setDeleteConfirmation({ show: false, id: null, name: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, id: null, name: null });
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const existingCategories = [...new Set(items.map(item => item.category).filter(cat => cat && cat.trim() !== ""))];

  const filteredCategories = existingCategories.filter(category =>
    category.toLowerCase().includes(newItem.category.toLowerCase())
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
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Price (KES)</label>
              <input
                type="number"
                step="0.01"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                required
                className="form-input"
                placeholder="Enter price in Kenya Shillings"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <div className="category-input-container" style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => {
                    setNewItem({ ...newItem, category: e.target.value });
                    setShowCategoryDropdown(true);
                  }}
                  onFocus={() => setShowCategoryDropdown(true)}
                  onBlur={() => {
                    setTimeout(() => setShowCategoryDropdown(false), 150);
                  }}
                  className="form-input"
                  placeholder="Type or select a category"
                />
                {showCategoryDropdown && filteredCategories.length > 0 && newItem.category && (
                  <div className="category-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '150px',
                    overflowY: 'auto'
                  }}>
                    {filteredCategories.map((category, index) => (
                      <div
                        key={index}
                        className="category-option"
                        onClick={() => {
                          setNewItem({ ...newItem, category });
                          setShowCategoryDropdown(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: index < filteredCategories.length - 1 ? '1px solid #eee' : 'none'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="add-btn">Add Item</button>
          </form>

          <div className="inventory-list">
            <h2>Inventory Items</h2>
            {filteredItems.length > 0 ? (
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price (KES)</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>KES {item.price.toFixed(2)}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-items">No items found</p>
            )}
          </div>
        </div>

        <footer className="main-footer">
          <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
        </footer>

        {deleteConfirmation.show && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete "{deleteConfirmation.name}"?</p>
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

export default InventoryScreen;
