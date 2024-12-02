import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import ManagerSidebar from "../components/ManagerSidebar";
import { LogoutThunk } from "../../../redux/thunk/authThunk";
import { useDispatch } from "react-redux";

const ManagerLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "":
        return "Dashboard";
      case "employees":
        return "Employees";
      case "leaves":
        return "Leave Requests";
      case "leave-types":
        return "Leave Types";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen">
      <ManagerSidebar />
      <div className="flex flex-1 flex-col ml-64 md:ml-0">
        {/* Top Navigation Bar */}
        <div className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="text-xl font-semibold text-gray-800">
            {getPageTitle()}
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-px bg-gray-200"></div>
            <button
              onClick={() => dispatch(LogoutThunk())}
              className="flex items-center rounded-lg p-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;
