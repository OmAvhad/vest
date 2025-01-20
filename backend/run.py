import eventlet

eventlet.monkey_patch()

from app import create_app
from app.populate import populate_db_with_historical_prices, populate_db_with_stock_data
from app.services.stock_service import StockService
from flask_cors import CORS
from flask_socketio import SocketIO
import random
import threading
import time

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*", transports=["websocket", "polling"])


@app.route("/")
def index():
    return "Hello, World!"


# Populate the database with historical_prices.csv
populate_db_with_historical_prices(app)

# Populate the database with stock data
populate_db_with_stock_data(app)


# Socket
@socketio.on("connect")
def handle_connect():
    print("Client connected")
    socketio.emit("message", {"message": "Connection established"})


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


# Update Stocks prices and emit to the client
def update_stock_prices():
    with app.app_context():
        while True:
            stocks = StockService.get_all()
            for stock in stocks:
                update_price = stock.current_price + random.choice(
                    [-1, 1]
                ) * random.randint(1, 10)
                stock = StockService.update_price(stock.trading_symbol, update_price)
                print(f"Stock {stock.trading_symbol} updated to {stock.current_price}")
                socketio.emit(
                    "stock_price_update",
                    {
                        "trading_symbol": stock.trading_symbol,
                        "current_price": stock.current_price,
                    },
                )
                socketio.sleep(0.2)


thread = threading.Thread(target=update_stock_prices)
thread.daemon = True
thread.start()

if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app, debug=True)
