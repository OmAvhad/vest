from ..extensions import db
from datetime import datetime


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )  # Assuming users are stored in a Users model
    stock_id = db.Column(
        db.Integer, db.ForeignKey("stocks.id"), nullable=False
    )  # Foreign key to Stock model
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)  # Price at which stock was bought/sold
    order_type = db.Column(db.String, nullable=False)  # 'buy' or 'sell'
    date = db.Column(
        db.DateTime, nullable=False, default=datetime.now()
    )  # Date of the order

    # Relationships
    user = db.relationship(
        "User", backref="orders", lazy=True
    )  # Reference to the User model
    stock = db.relationship(
        "Stock", backref="orders", lazy=True
    )  # Reference to the Stock model

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return (
            f"<Order {self.order_type} {self.quantity} of {self.stock.trading_symbol}>"
        )
