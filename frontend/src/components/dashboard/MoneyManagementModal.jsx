import { useState } from "react";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { api } from "@/api/axios";

const MoneyManagementModal = ({
  isOpen,
  onClose,
  type,
  currentBalance,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount", { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        type === "add" ? "/users/add-money" : "/users/withdraw-money";
      const response = await api.post(endpoint, { amount: parseFloat(amount) });

      toast.success(
        `Successfully ${type === "add" ? "added" : "withdrawn"} money`,
        { autoClose: 1000 }
      );
      onSuccess(response.data);
      onClose();
      setAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        {type === "add" ? "Add Money" : "Withdraw Money"}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Current Balance
            </label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={currentBalance}
              disabled
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Amount
            </label>
            <input
              type="number"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`${
            type === "add"
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-red-500 hover:bg-red-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : type === "add"
            ? "Add Money"
            : "Withdraw Money"}
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

export default MoneyManagementModal;
