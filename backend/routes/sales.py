from flask import Blueprint, request, jsonify
from db import get_connection

sales_bp = Blueprint("sales", __name__)

# Route to insert a new sale
@sales_bp.route("/api/sales", methods=["POST"])
def add_sale():
    data = request.get_json()

    # Extract data with fallback checks
    product_name = data.get("productName")
    quantity_sold = data.get("quantitySold")
    sold_price = data.get("soldPrice")

    if not product_name or quantity_sold is None or sold_price is None:
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
        cur.close()
        conn.close()
        return jsonify({"message": "Sale added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#
