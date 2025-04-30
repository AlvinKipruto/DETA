import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <form className="add-item-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          min="0"
          value={newItem.quantity}
          onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Price"
          min="0"
          step="0.01"
          value={newItem.price}
          onChange={(e) => setNewItem({...newItem, price: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="inventory-list">
        {filteredItems.length > 0 ? (
          <>
            <div className="list-header">
              <span>Item</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Category</span>
              <span>Action</span>
            </div>
            {filteredItems.map(item => (
              <div key={item.id} className="inventory-item">
                <span>{item.name}</span>
                <span>{item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>{item.category}</span>
                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        ) : (
          <p className="no-items">No items found</p>
        )}
      </div>
      <br />
      <button className="back-btn" onClick={() => navigate("/")}>Back to Home</button>

    </div>
  );
};

export default InventoryScreen;