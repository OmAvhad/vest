import { Outlet } from "react-router-dom";
import { CustomSideBar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Hi! {user.username}</h1>
      <CustomSideBar />
      <div className="flex-1 p-3 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
