import { useState, useEffect } from "react";
import { Card, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import api from "@/api/axios";

const TradeModal = ({ isOpen, onClose, stock, type }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTrade = async (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setLoading(true);
    try {
      await api.post("/orders/", {
        stock_id: stock.id,
        quantity: parseInt(quantity),
        order_type: type,
      });

      toast.success(
        `Successfully placed ${type} order for ${stock.trading_symbol}`,
        { autoClose: 2000 }
      );
      onClose();
      setQuantity(1);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Trade failed");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = stock?.current_price * quantity || 0;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        {type === "buy" ? "Buy" : "Sell"} {stock?.trading_symbol}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Current Price
            </label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={stock?.current_price || 0}
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Quantity
            </label>
            <input
              type="number"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 0))
              }
              min="1"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Total Amount
            </label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={totalAmount.toFixed(2)}
              disabled
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`${
            type === "buy"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-red-500 hover:bg-red-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={handleTrade}
          disabled={loading}
        >
          {loading ? "Processing..." : `Place ${type} Order`}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export function Explore() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await api.get("/stocks/");
        setStocks(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch stocks");
      }
    };

    fetchStocks();
  }, []);

  const [selectedStock, setSelectedStock] = useState(null);
  const [tradeType, setTradeType] = useState("buy");
  const [showModal, setShowModal] = useState(false);

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
                  <p className="text-xl font-bold">₹{stock.current_price}</p>
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

      <TradeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        stock={selectedStock}
        type={tradeType}
      />
    </div>
  );
}
