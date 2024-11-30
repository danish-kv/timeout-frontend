import React, { useState } from "react";
import {
  Calendar,
  Bell,
  ChevronDown,
  UserCircle,
  LogOut,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = "John Doe"; // Replace with actual username

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out");
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Name Section */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-red-600" />
          <span className="text-xl font-semibold text-gray-800">Timeout</span>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded-md"
            >
              <UserCircle className="h-6 w-6 text-gray-600" />
              <span className="text-sm font-medium">{username}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <ul className="py-1">
                  <Link to={"/profile"}>
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </li>
                  </Link>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
