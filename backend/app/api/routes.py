from flask import Blueprint
from .historical_price import historical_price_bp
from .user import user_bp
from .stock import stock_bp
from .order import order_bp

api = Blueprint("api", __name__, url_prefix="/api")


def register_routes(app):

    api.register_blueprint(user_bp)
    api.register_blueprint(historical_price_bp)
    api.register_blueprint(stock_bp)
    api.register_blueprint(order_bp)
    app.register_blueprint(api)

    return app
