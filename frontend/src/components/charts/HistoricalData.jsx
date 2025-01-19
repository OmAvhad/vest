// import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import api from "@/api/axios";

import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  //   SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function HistoricalData() {
  const [symbol, setSymbol] = useState("NIFTY 50");
  const [fromDate, setFromDate] = useState("2017-01-02");
  const [toDate, setToDate] = useState("2017-12-31");

  const [historicalPrices, setHistoricalPrices] = useState([]);

  useEffect(() => {
    // Query params
    const params = new URLSearchParams();
    if (symbol) {
      params.append("symbol", symbol);
    }
    if (fromDate) {
      params.append(
        "from_date",
        new Date(fromDate).toLocaleDateString("en-CA") // YYYY-MM-DD format
      );
    }
    if (toDate) {
      params.append(
        "to_date",
        new Date(toDate).toLocaleDateString("en-CA") // YYYY-MM-DD format
      );
    }

    api
      .get("/historical_prices", { params })
      .then((response) => {
        setHistoricalPrices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [symbol, fromDate, toDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Historical data visualization</CardDescription>
        <div className="flex gap-2 justify-center items-center">
          <div className="text-sm">Symbol:</div>
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
          <div className="text-sm">From:</div>
          <Datepicker
            defaultValue={new Date("2017-01-02")}
            minDate={new Date("2017-01-02")}
            maxDate={new Date("2021-12-31")}
            onChange={(date) => setFromDate(date)}
          />
          <div className="text-sm">To:</div>
          <Datepicker
            defaultValue={new Date("2021-12-31")}
            minDate={new Date("2017-01-02")}
            maxDate={new Date("2021-12-31")}
            onChange={(date) => setToDate(date)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={historicalPrices}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
              //   tickMargin={}
              tickCount={10}
              tickFormatter={(value) => `${value.toFixed(2)}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
