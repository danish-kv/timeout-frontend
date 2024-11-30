import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell, MessageSquare, LogOut, Sidebar } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const ManagerLayout = () => {
  const location = useLocation();
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case '':
        return 'Dashboard';
      case 'employees':
        return 'Employees';
      case 'leaves':
        return 'Leave Requests';
      case 'reports':
        return 'Reports';
      case 'settings':
        return 'Settings';
      default:
        return '';
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* Top Navigation Bar */}
        <div className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="text-xl font-semibold text-gray-800">
            {getPageTitle()}
          </div>
          <div className="flex items-center space-x-4">
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <MessageSquare className="h-5 w-5 text-gray-500" />
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <button className="flex items-center rounded-lg p-2 text-red-600 hover:bg-red-50">
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