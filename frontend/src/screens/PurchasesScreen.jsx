import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/purchasesscreen.css";

const PurchasesScreen = () => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    setPurchases(storedPurchases);
  }, []);

  return (
    <div className="purchases-container">
      <h2 className="purchases-title">Purchase Records</h2>
      <table className="purchases-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity Sold</th>
            <th>Price Sold</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.productName}</td>
              <td>{purchase.quantity}</td>
              <td>${purchase.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p></p>
      <button className="back-button" onClick={() => navigate("/sales")}>Back</button><br />
      <button className="home-btn" onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default PurchasesScreen;
