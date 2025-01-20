import { useState, useEffect, useCallback } from "react";
import { Card, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { api, base_api_url } from "@/api/axios";
import TradeModal from "@/components/dashboard/TradeModal";
import { io } from "socket.io-client";

export function Explore() {
  const [stocks, setStocks] = useState([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeType, setTradeType] = useState("buy");
  const [showModal, setShowModal] = useState(false);

  // Move stock update logic to a callback
  const handleStockUpdate = useCallback((data) => {
    console.log("Stock price update", data);
    setStocks((currentStocks) =>
      currentStocks.map((stock) => {
        if (stock.trading_symbol === data.trading_symbol) {
          return {
            ...stock,
            current_price: data.current_price,
          };
        }
        return stock;
      })
    );
  }, []);

  useEffect(() => {
    let socket;

    const initializeSocket = () => {
      socket = io(base_api_url, {
        transports: ["websocket", "polling"],
      });

      socket.on("connect", () => {
        console.log("Connected to the server");
        setIsSocketConnected(true);
      });

      socket.on("message", (data) => {
        console.log(data);
      });

      socket.on("stock_price_update", handleStockUpdate);

      socket.on("disconnect", () => {
        console.log("Disconnected from the server");
        setIsSocketConnected(false);
      });
    };

    const fetchStocks = async () => {
      try {
        const { data } = await api.get("/stocks/");
        setStocks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch stocks");
        setLoading(false);
      }
    };

    // Initialize socket first, then fetch stocks
    initializeSocket();
    fetchStocks();

    // Cleanup function
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("message");
        socket.off("stock_price_update");
        socket.off("disconnect");
        socket.disconnect();
      }
    };
  }, [handleStockUpdate]); // Add handleStockUpdate to dependencies

  const handleTrade = (stock, type) => {
    setSelectedStock(stock);
    setTradeType(type);
    setShowModal(true);
  };

  const calculateDayChange = (current, close) => {
    const change = current - close;
    const percentChange = (change / close) * 100;
    return {
      change: change.toFixed(2),
      percentChange: percentChange.toFixed(2),
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Stocks</h1>
      <div className="mb-4">
        <p
          className={`text-sm ${
            isSocketConnected ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSocketConnected
            ? "Socket is connected"
            : "Socket is not connected"}
        </p>
      </div>
      <div className="grid gap-1">
        {stocks.map((stock) => {
          const dayChange = calculateDayChange(
            stock.current_price,
            stock.close_price
          );
          const isPositive = parseFloat(dayChange.change) >= 0;

          return (
            <Card key={stock.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {stock.trading_symbol}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stock.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    ₹{stock.current_price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {dayChange.change} ({dayChange.percentChange}%)
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-1">
                <button
                  onClick={() => handleTrade(stock, "buy")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleTrade(stock, "sell")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sell
                </button>
              </div>
            </Card>
          );
        })}
      </div>
      {isLoading && (
        <div className="text-center py-8">
          <Spinner className="w-8 h-8" />
        </div>
      )}
      {!isLoading && stocks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No stocks found</p>
        </div>
      )}

      <TradeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        stock={selectedStock}
        type={tradeType}
      />
    </div>
  );
}
