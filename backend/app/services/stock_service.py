from ..models.stock_model import Stock


class StockService:
    @staticmethod
    def get_all():
        return Stock.query.all()

    @staticmethod
    def create(data):
        stock = Stock(
            trading_symbol=data["trading_symbol"],
            exchange=data["exchange"],
            isin=data["isin"],
            name=data["name"],
            current_price=data["current_price"],
            close_price=data["close_price"],
        )
        stock.save()

    @staticmethod
    def get_by_symbol(symbol):
        return Stock.query.filter_by(symbol=symbol).first()

    @staticmethod
    def get_by_id(id):
        return Stock.query.get(id)
