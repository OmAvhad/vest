import csv
from datetime import datetime
from app.services.historical_price_service import HistoricalPriceService
from app.services.stock_service import StockService
from sqlalchemy.exc import OperationalError


def populate_db_with_historical_prices(app):
    with app.app_context():
        try:
            # Check if the HistorailPrice table is empty
            if not HistoricalPriceService.get_all():
                with open("historical_prices.csv", "r") as file:
                    reader = csv.reader(file)
                    next(reader)  # Skip the header row
                    for row in reader:
                        date_str = row[1]
                        # Parse the date string with timezone info to a datetime object
                        date = datetime.strptime(date_str, "%Y-%m-%d")

                        price = float(row[2])
                        instrument_name = row[3]

                        HistoricalPriceService.create(
                            {
                                "date": date,
                                "price": price,
                                "instrument_name": instrument_name,
                            }
                        )
        except OperationalError as e:
            print(e)


def populate_db_with_stock_data(app):
    with app.app_context():
        try:
            if not StockService.get_all():
                with open("indian_stocks_data.csv", "r") as file:
                    reader = csv.reader(file)
                    next(reader)  # Skip the header row
                    for row in reader:
                        StockService.create(
                            {
                                "trading_symbol": row[0],
                                "exchange": row[1],
                                "isin": row[2],
                                "name": row[3],
                                "current_price": row[4],
                                "close_price": row[5],
                            }
                        )
        except OperationalError as e:
            print(e)
