import { useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { api } from "@/api/axios";

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

export default TradeModal;