import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ChevronLeft,
  Menu,
  Shapes,
} from "lucide-react";

const ManagerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "employees",
      title: "Employees",
      icon: Users,
    },
    {
      id: "leaves",
      title: "Leave Requests",
      icon: Calendar,
    },
    {
      id: "leave-types",
      title: "Types Leave",
      icon: Shapes,
    },
  ];

  const getCurrentPage = () => {
    const path = location.pathname.split("/").pop();
    console.log(path);

    return path || "";
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } flex h-screen flex-col bg-white transition-all duration-300 ease-in-out`}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-lg bg-red-600"></div>
            <span className="ml-3 font-bold text-gray-800">Leave Manager</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-1.5 hover:bg-gray-100"
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/manager/${item.id}`)}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              getCurrentPage() === item.id
                ? "bg-red-50 text-red-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && (
              <>
                <span className="ml-3 flex-1 whitespace-nowrap">
                  {item.title}
                </span>
              </>
            )}
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">manager@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerSidebar;
