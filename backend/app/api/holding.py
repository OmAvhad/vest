from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.user_service import UserService
from ..services.holding_service import HoldingService
from ..schemas.holding_schema import holdings_schema

holding_bp = Blueprint("holding", __name__, url_prefix="/holdings")

@holding_bp.route("/", methods=["GET"])
@jwt_required()
def get_my_holdings():
    current_user = get_jwt_identity()
    user_id = UserService.get_by_username(current_user).id
    holdings = HoldingService.get_holdings_by_user_id(user_id)
    return jsonify(holdings_schema.dump(holdings)), 200