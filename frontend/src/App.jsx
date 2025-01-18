import "./App.css";
import { HistoricalData } from "./components/charts/HistoricalData";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Historical Data</h1>
      <HistoricalData />
    </>
  );
}

export default App;
