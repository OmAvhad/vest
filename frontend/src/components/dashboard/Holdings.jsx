import { Table, Card, Spinner } from "flowbite-react";
import { useState, useEffect } from "react";
import { api } from "@/api/axios";
import { TrendingDown, TrendingUp } from "lucide-react";

export function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHoldings() {
      try {
        const response = await api.get("/users/holdings");
        setHoldings(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHoldings();
  }, []);

  const totalPnL = holdings.reduce((acc, item) => acc + item.pnl, 0).toFixed(2);

  const totalInvestment = holdings
    .reduce((acc, item) => acc + item.quantity * item.average_price, 0)
    .toFixed(2);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Holdings Overview</h1>
      <div className="flex flex-row gap-2">
        <Card className="mb-4 w-[15%] shadow-sm rounded-lg bg-white border border-gray-200">
          <div className="text-sm font-medium text-gray-500">
            Total Investment
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalInvestment)}
            </span>
          </div>
        </Card>

        <Card className="mb-4 w-[15%] shadow-sm rounded-lg bg-white border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total P/L</div>
          <div className="mt-2 flex items-center">
            <span
              className={`text-2xl font-bold ${
                Number(totalPnL) >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(totalPnL)}
            </span>
            {Number(totalPnL) >= 0 ? (
              <TrendingUp className="w-5 h-5 ml-2 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 ml-2 text-red-600" />
            )}
          </div>
        </Card>
      </div>

      <Table>
        <Table.Head>
          <Table.HeadCell>Trading Symbol</Table.HeadCell>
          <Table.HeadCell>Exchange</Table.HeadCell>
          <Table.HeadCell>ISIN</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Average Price</Table.HeadCell>
          <Table.HeadCell>Last Price</Table.HeadCell>
          <Table.HeadCell>Close Price</Table.HeadCell>
          <Table.HeadCell>PnL</Table.HeadCell>
          <Table.HeadCell>Day Change</Table.HeadCell>
          <Table.HeadCell>Day Change %</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {holdings.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.stock.trading_symbol}
              </Table.Cell>
              <Table.Cell>{item.stock.exchange}</Table.Cell>
              <Table.Cell>{item.stock.isin}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.average_price.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.stock.current_price.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.stock.close_price.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.pnl.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.day_change.toFixed(2)}</Table.Cell>
              <Table.Cell>{item.day_change_percentage.toFixed(2)}%</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isLoading && (
        <div className="text-center py-8">
          <Spinner className="w-8 h-8" />
        </div>
      )}
      {holdings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No holdings found</p>
        </div>
      )}
    </div>
  );
}
