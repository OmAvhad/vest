import { useState, useEffect } from "react";
import { Card, Dropdown } from "flowbite-react";
import { Calendar, Clock, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import api from "@/api/axios";

export function OrdersHistory() {
  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState("all"); // 'all', 'buy', 'sell'

  useEffect(() => {
    api.get("/orders/").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.order_type === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order History</h1>
        <div className="flex items-center gap-4">
          <Dropdown label="Filter" className="bg-white">
            <Dropdown.Item
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gray-100" : ""}
            >
              All Orders
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilter("buy")}
              className={filter === "buy" ? "bg-gray-100" : ""}
            >
              Buy Orders
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilter("sell")}
              className={filter === "sell" ? "bg-gray-100" : ""}
            >
              Sell Orders
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    order.order_type === "buy"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.order_type === "buy" ? (
                    <ArrowUpCircle className="w-6 h-6" />
                  ) : (
                    <ArrowDownCircle className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {order.order_type === "buy" ? "Bought" : "Sold"}{" "}
                    {order.quantity} shares
                  </p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(order.date)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTime(order.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{order.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  Total: ₹{(order.price * order.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <Card className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
