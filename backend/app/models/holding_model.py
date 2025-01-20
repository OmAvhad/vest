from ..extensions import db
from ..models.stock_model import Stock


class Holding(db.Model):
    __tablename__ = "holdings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)  # The user who owns the holding
    stock_id = db.Column(
        db.Integer, db.ForeignKey("stocks.id"), nullable=False
    )  # ForeignKey to Stock
    quantity = db.Column(db.Integer, nullable=False)  # The quantity of stock held
    average_price = db.Column(
        db.Float, nullable=False
    )  # The price at which the stock was bought

    # This relationship allows us to access stock directly from the Holding
    stock = db.relationship("Stock", backref="holdings", lazy=True)

    def save(self):
        # Now, save the holding to the database
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"<Holding {self.quantity} units of {self.stock.trading_symbol}>"
