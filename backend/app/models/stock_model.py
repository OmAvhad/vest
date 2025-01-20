from ..extensions import db


class Stock(db.Model):
    __tablename__ = "stocks"

    id = db.Column(db.Integer, primary_key=True)
    trading_symbol = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False, default="")
    exchange = db.Column(db.String, nullable=False)
    isin = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)  # The name of the company or stock
    current_price = db.Column(db.Float, nullable=False)  # Latest price of the stock
    close_price = db.Column(db.Float, nullable=False)  # Closing price of the stock

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<Stock {self.trading_symbol}>"
