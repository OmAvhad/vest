import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/Home";
import { HistoricalData } from "./components/charts/HistoricalData";
import { Profile } from "./components/dashboard/Profile";
import { Holdings } from "./components/dashboard/Holdings";
import { Explore } from "./components/dashboard/Explore";
import { OrdersHistory } from "./components/dashboard/Order";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index path="" element={<Holdings />} />
              <Route path="explore" element={<Explore />} />
              <Route path="profile" element={<Profile />} />
              <Route path="chart" element={<HistoricalData />} />
              <Route path="order-history" element={<OrdersHistory />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
