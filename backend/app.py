from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import get_connection
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        conn.commit()
        return jsonify({"message": "Signup successful"}), 201
    except Exception:
        conn.rollback()
        return jsonify({"error": "Email already exists"}), 400
    finally:
        cur.close()
        conn.close()

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/sales", methods=["POST"])
def record_sale():
    data = request.json
    productName = data.get("productName")
    quantity = data.get("quantity")
    price = data.get("price")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO sales (product_name, quantity_sold, sold_price) VALUES (%s, %s, %s)",
        (productName, quantity, price)
    )
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Sale recorded successfully"}), 201

@app.route("/api/purchases", methods=["GET"])
def get_sales():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT product_name, quantity_sold, sold_price FROM sales")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = [
        {"productName": row[0], "quantity": row[1], "price": float(row[2])}
        for row in rows
    ]
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
