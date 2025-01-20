import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import api from "@/api/axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  desktop: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
};

export function HistoricalData() {
  const [symbol, setSymbol] = useState("NIFTY 50");
  const [fromDate, setFromDate] = useState("2017-01-02");
  const [toDate, setToDate] = useState("2017-12-31");
  const [historicalPrices, setHistoricalPrices] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (symbol) params.append("symbol", symbol);
    if (fromDate) params.append("from_date", new Date(fromDate).toLocaleDateString("en-CA"));
    if (toDate) params.append("to_date", new Date(toDate).toLocaleDateString("en-CA"));

    api
      .get("/historical_prices/", { params })
      .then((response) => {
        setHistoricalPrices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [symbol, fromDate, toDate]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Market Index Chart</h1>
        <p className="text-gray-500 mt-2">Historical price data visualization</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-4 justify-start items-center">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Symbol:</div>
              <Select onValueChange={(e) => setSymbol(e)} value={symbol}>
                <SelectTrigger className="w-[180px] h-[40px]">
                  <SelectValue placeholder="Select a symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="NIFTY 50">NIFTY 50</SelectItem>
                    <SelectItem value="NIFTY BANK">NIFTY BANK</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">From:</div>
              <Datepicker
                value={new Date(fromDate)}
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2021-12-31")}
                onChange={(date) => setFromDate(date)}
                className="w-[180px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">To:</div>
              <Datepicker
                value={new Date(toDate)}
                minDate={new Date("2017-01-02")}
                maxDate={new Date("2021-12-31")}
                onChange={(date) => setToDate(date)}
                className="w-[180px]"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[500px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalPrices}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 30,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    }
                  />
                  <YAxis
                    dataKey="price"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickCount={8}
                    tickFormatter={(value) => formatPrice(value)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        valueFormatter={(value) => formatPrice(value)}
                      />
                    }
                  />
                  <Line
                    dataKey="price"
                    type="monotone"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HistoricalData;