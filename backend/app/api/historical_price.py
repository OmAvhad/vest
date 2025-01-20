from datetime import datetime
from flask import Blueprint, jsonify, request
from ..schemas.historical_price_schema import historical_prices_schema
from ..services.historical_price_service import HistoricalPriceService
from flask_jwt_extended import jwt_required

historical_price_bp = Blueprint(
    "historical_price", __name__, url_prefix="/historical_prices"
)


@historical_price_bp.route("/", methods=["GET"])
@jwt_required()
def get_historical_prices():
    symbol = request.args.get("symbol")
    from_date = request.args.get("from_date")
    to_date = request.args.get("to_date")

    if from_date:
        try:
            from_date = datetime.strptime(from_date, "%Y-%m-%d")
        except ValueError:
            return jsonify({"message": "Invalid from_date format. Use YYYY-MM-DD"}), 400

    if to_date:
        try:
            to_date = datetime.strptime(to_date, "%Y-%m-%d")
        except ValueError:
            return jsonify({"message": "Invalid to_date format. Use YYYY-MM-DD"}), 400

    if from_date and to_date and from_date > to_date:
        return jsonify({"message": "from_date cannot be greater than to date"}), 400

    # Get historical prices by symbol and/or date range
    if symbol and from_date and to_date:
        historical_prices = (
            HistoricalPriceService.get_historical_prices_by_symbol_and_date_range(
                symbol, from_date, to_date
            )
        )
    elif symbol:
        historical_prices = HistoricalPriceService.get_historical_prices_by_symbol(
            symbol
        )
    elif from_date and to_date:
        historical_prices = HistoricalPriceService.get_historical_prices_by_date_range(
            from_date, to_date
        )
    else:
        historical_prices = HistoricalPriceService.get_all()

    if not historical_prices:
        return jsonify({"message": "No historical prices found"}), 404

    return jsonify(historical_prices_schema.dump(historical_prices)), 200
