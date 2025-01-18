import csv
from datetime import datetime
from app.services.historical_price_service import HistoricalPriceService
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
