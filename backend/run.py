from app import create_app
from app.populate import populate_db_with_historical_prices
from flask_cors import CORS

app = create_app()


@app.route("/")
def index():
    return "Hello, World!"


# Populate the database with historical_prices.csv
populate_db_with_historical_prices(app)

if __name__ == "__main__":
    app.run(debug=True)
