from flask import Blueprint, jsonify, request
from ..schemas.user_schema import user_schema
from ..services.user_service import UserService
from ..exceptions.user_exception import UserAlreadyExistsError
from ..exceptions.exceptions import InvalidPasswordError
from ..services.user_service import UserService
from ..services.holding_service import HoldingService
from ..schemas.holding_schema import holdings_schema

from werkzeug.security import check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)

user_bp = Blueprint("user", __name__, url_prefix="/users")


@user_bp.route("/register", methods=["POST"])
def register_user():
    username = request.json.get("username")
    password = request.json.get("password")
    name = request.json.get("name")
    email = request.json.get("email")

    if not username or not password or not name or not email:
        return jsonify({"message": "Invalid payload"}), 400

    try:
        user = UserService.create(
            {"name": name, "username": username, "password": password, "email": email}
        )
    except UserAlreadyExistsError as e:
        return jsonify({"message": str(e)}), 400
    except InvalidPasswordError as e:
        return jsonify({"message": str(e)}), 400
    except Exception as e:
        print(e)
        return jsonify({"message": "Internal Server Error"}), 500

    access_token = create_access_token(identity=user.username)
    refresh_token = create_refresh_token(identity=user.username)

    return (
        jsonify(
            {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
        ),
        201,
    )


@user_bp.route("/login", methods=["POST"])
def login_user():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username or not password:
        return jsonify({"message": "Invalid payload"}), 400

    user = UserService.get_by_username(username)

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid password"}), 400

    access_token = create_access_token(identity=user.username)
    refresh_token = create_refresh_token(identity=user.username)

    return (
        jsonify(
            {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
        ),
        200,
    )


@user_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify({"access_token": access_token}), 200


@user_bp.route("/protected", methods=["POST"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(username=current_user), 200


@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def me():
    current_user = get_jwt_identity()
    user = UserService.get_by_username(current_user)
    return jsonify(user_schema.dump(user)), 200


@user_bp.route("/add-money", methods=["POST"])
@jwt_required()
def add_money():
    current_user = get_jwt_identity()
    amount = request.json.get("amount")
    try:
        user = UserService.add_money(current_user, amount)
        return (
            jsonify({"message": "Money added successfully", "balance": user.balance}),
            200,
        )
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    except Exception as e:
        return jsonify({"message": "Failed to add money", "error": str(e)}), 500


@user_bp.route("/withdraw-money", methods=["POST"])
@jwt_required()
def withdraw_money():
    current_user = get_jwt_identity()
    amount = request.json.get("amount")
    try:
        user = UserService.withdraw_money(current_user, amount)
        return (
            jsonify(
                {"message": "Money withdrawn successfully", "balance": user.balance}
            ),
            200,
        )
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    except Exception as e:
        return jsonify({"message": "Failed to withdraw money", "error": str(e)}), 500


@user_bp.route("/holdings", methods=["GET"])
@jwt_required()
def get_my_holdings():
    current_user = get_jwt_identity()
    user_id = UserService.get_by_username(current_user).id
    holdings = HoldingService.get_holdings_by_user_id(user_id)
    return jsonify(holdings_schema.dump(holdings)), 200
