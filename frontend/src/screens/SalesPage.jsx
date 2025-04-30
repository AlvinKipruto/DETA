import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/salespage.css";

const SalesPage = () => {
  const [productName, setProductName] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [soldPrice, setSoldPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const saleEntry = {
      productName,
      quantity: parseInt(quantitySold, 10),
      price: parseFloat(soldPrice),
    };

    const existingData = JSON.parse(localStorage.getItem("purchases")) || [];
    existingData.push(saleEntry);
    localStorage.setItem("purchases", JSON.stringify(existingData));

    // Clear form
    setProductName("");
    setQuantitySold("");
    setSoldPrice("");

    // Optionally, navigate to the purchases page
    navigate("/purchases");
  };

  return (
    <div className="sales-container">
      <h2 className="sales-title">Record a Sale</h2>
      <form className="sales-form" onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </label>
        <label>
          Quantity Sold:
          <input
            type="number"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </label>
        <label>
          Sold Price:
          <input
            type="number"
            value={soldPrice}
            onChange={(e) => setSoldPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </label>
        <button type="submit" className="sales-button">Save Sale</button>
      </form>
      <p></p>
      <button className="back-bt" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default SalesPage;
