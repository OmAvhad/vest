import { Outlet } from "react-router-dom";
import { CustomSideBar } from "@/components/dashboard/Sidebar";
import { Navbar } from "flowbite-react";

export function Dashboard() {
  return (
    <>
      <Navbar fluid rounded className="border-b">
        <Navbar.Brand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            VEST Dashboard
          </span>
        </Navbar.Brand>
      </Navbar>
      <div className="flex flex-row w-full">
        <CustomSideBar />
        <div className="flex-1 p-3 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
