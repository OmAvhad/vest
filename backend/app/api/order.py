from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.stock_service import StockService
from ..services.order_service import OrderService
from ..services.user_service import UserService
from ..schemas.order_schema import orders_schema, order_schema

order_bp = Blueprint("order", __name__, url_prefix="/orders")


@order_bp.route("/", methods=["GET"])
@jwt_required()
def get_my_orders():
    current_user = get_jwt_identity()
    user_id = UserService.get_by_username(current_user).id
    orders = OrderService.get_orders_by_user_id(user_id)
    return jsonify(orders_schema.dump(orders)), 200


@order_bp.route("/", methods=["POST"])
@jwt_required()
def create_order():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No input data provided"}), 400

        required_fields = ["stock_id", "quantity", "order_type"]
        if not all(field in data for field in required_fields):
            return jsonify({"message": "Missing required fields"}), 400

        quantity = data["quantity"]
        if not isinstance(quantity, int) or quantity <= 0:
            return jsonify({"message": "Invalid quantity"}), 400

        order_type = data["order_type"].lower()
        if order_type not in ["buy", "sell"]:
            return jsonify({"message": "Invalid order type"}), 400

        current_user = get_jwt_identity()
        user_id = UserService.get_by_username(current_user).id

        order = OrderService.create(
            stock_id=data["stock_id"],
            user_id=user_id,
            order_type=order_type,
            quantity=quantity,
        )

        return jsonify(
            {"message": "Order created successfully", "order": order_schema.dump(order)}
        )

    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to create orderrr", "error": str(e)}), 500
