import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  ChartLine,
  PieChart,
  LogOut,
  Compass,
  Receipt,
} from "lucide-react";

export function CustomSideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", icon: PieChart, label: "Holdings" },
    { path: "/dashboard/explore", icon: Compass, label: "Explore" },
    { path: "/dashboard/order-history", icon: Receipt, label: "Orders" },
    { path: "/dashboard/chart", icon: ChartLine, label: "Chart" },
    { path: "/dashboard/profile", icon: UserCircle, label: "Profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                isActive(path)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 ${
                  isActive(path) ? "text-blue-600" : "text-gray-500"
                }`}
              />
              {label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default CustomSideBar;
