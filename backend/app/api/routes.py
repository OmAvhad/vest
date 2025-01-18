from flask import Blueprint
from .historical_price import historical_price_bp

api = Blueprint("api", __name__, url_prefix="/api")


def register_routes(app):

    api.register_blueprint(historical_price_bp)
    app.register_blueprint(api)

    return app
