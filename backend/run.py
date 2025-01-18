from flask_cors import CORS
from app import create_app
from app.populate import populate_db_with_historical_prices

app = create_app()
CORS(app)


@app.route("/")
def index():
    return "Hello, World!"


populate_db_with_historical_prices(app)

if __name__ == "__main__":
    app.run(debug=True)
