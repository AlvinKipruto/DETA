from flask import Blueprint, request, jsonify
from db import get_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

sales_bp = Blueprint("sales", __name__)

# Route to insert a new sale
@sales_bp.route("/api/sales", methods=["POST"])
@jwt_required()
def add_sale():
    data = request.get_json()

    # Extract data with fallback checks
    productName = data.get("productName")
    quantity = data.get("quantitySold")
    price = data.get("soldPrice")

    if not productName or quantity is None or price is None:
        return jsonify({"error": "Missing sale data"}), 400

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO sales (product_name, quantity_sold, sold_price)
            VALUES (%s, %s, %s)
            """,
            (product_name, quantity_sold, sold_price)
        )
        conn.commit()
       
        return jsonify({"message": "Sale added successfully"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()
