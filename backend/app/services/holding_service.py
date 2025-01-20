from ..models.holding_model import Holding

class HoldingService:
    @staticmethod
    def get_all():
        return Holding.query.all()

    @staticmethod
    def create(user_id, stock_id, quantity, average_price):
        holding = Holding(
            user_id=user_id,
            stock_id=stock_id,
            quantity=quantity,
            average_price=average_price,
        )
        holding.save()

    @staticmethod
    def get_by_id(id):
        return Holding.query.get(id)

    @staticmethod
    def get_holdings_by_user_id(user_id):
        return Holding.query.filter_by(user_id=user_id).all()
    
    @staticmethod
    def get_by_user_id_and_stock_id(user_id, stock_id):
        return Holding.query.filter_by(user_id=user_id, stock_id=stock_id).first()