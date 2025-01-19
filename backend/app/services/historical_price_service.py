from ..models.historical_price_model import HistoricalPrice


class HistoricalPriceService:

    @staticmethod
    def create(new_attrs):
        historical_price = HistoricalPrice(
            date=new_attrs["date"],
            price=new_attrs["price"],
            instrument_name=new_attrs["instrument_name"],
        )
        historical_price.save()
        return historical_price

    @staticmethod
    def get_all():
        return HistoricalPrice.query.all()

    @staticmethod
    def get_by_id(id):
        return HistoricalPrice.query.get(id)

    @staticmethod
    def get_historical_prices_by_symbol(symbol):
        return HistoricalPrice.query.filter_by(instrument_name=symbol).all()

    @staticmethod
    def get_historical_prices_by_date_range(from_date, to_date):
        return HistoricalPrice.query.filter(
            HistoricalPrice.date >= from_date, HistoricalPrice.date <= to_date
        ).all()

    @staticmethod
    def get_historical_prices_by_symbol_and_date_range(symbol, from_date, to_date):
        return HistoricalPrice.query.filter(
            HistoricalPrice.instrument_name == symbol,
            HistoricalPrice.date >= from_date,
            HistoricalPrice.date <= to_date,
        ).all()
