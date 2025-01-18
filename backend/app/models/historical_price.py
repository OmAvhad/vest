from ..extensions import db


class HistoricalPrice(db.Model):
    __tablename__ = "historical_prices"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    instrument_name = db.Column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        return f"<HistoricalPrice {self.symbol} {self.date}>"
