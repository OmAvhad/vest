import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiChartPie, HiLogout } from "react-icons/hi";
import { MdArticle } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaUserLock } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        className="h-full"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup >
            <Sidebar.Item as={Link} to="" icon={HiChartPie} className="text-xl">
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/users" icon={FaUsers}>
              Users
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/roles" icon={MdWork}>
              Roles
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/dashboard/permissions"
              icon={FaUserLock}
            >
              Permissions
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/articles" icon={MdArticle}>
              Articles
            </Sidebar.Item>
            <Sidebar.Item onClick={handleLogout} icon={HiLogout} as="button">
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
