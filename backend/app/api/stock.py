from ..services.stock_service import StockService
from ..schemas.stock_schema import stocks_schema
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

stock_bp = Blueprint("stock", __name__, url_prefix="/stocks")


@stock_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_stocks():
    stocks = StockService.get_all()
    return jsonify(stocks_schema.dump(stocks))
