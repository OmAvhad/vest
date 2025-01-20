import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  UserCircle,
  ChartLine,
  PieChart,
  LogOutIcon,
  CompassIcon,
  ReceiptIndianRupee,
} from "lucide-react";

export function CustomSideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        aria-label="Default sidebar example"
        className="h-full bg-white dark:bg-white"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/dashboard" icon={PieChart}>
              Holdings
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/explore" icon={CompassIcon}>
              Explore
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/dashboard/order-history"
              icon={ReceiptIndianRupee}
            >
              Orders
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/chart" icon={ChartLine}>
              Chart
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/profile" icon={UserCircle}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item onClick={handleLogout} icon={LogOutIcon} as="button">
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
