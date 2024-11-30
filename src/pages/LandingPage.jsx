import React from "react";
import { Building2, Users, Calendar, CheckCircle } from "lucide-react";
import { Link  } from "react-router-dom"
import Header from "../features/employee/components/Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex flex-col">
      {/* Navigation Bar */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-2 gap-16">
          {/* Left Column - Content */}
          <div className="space-y-6 py-12">
            <h1 className="text-5xl font-bold text-gray-900">
              Streamline Your Leave Management Process
            </h1>
            <p className="text-xl text-gray-600">
              Efficient, transparent, and hassle-free leave management system
              for modern organizations
            </p>

            {/* Feature List */}
            <div className="space-y-4 mt-12">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-red-600" />
                <span className="text-gray-700 text-lg">
                  Quick leave request submission
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-red-600" />
                <span className="text-gray-700 text-lg">
                  Real-time approval tracking
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-red-600" />
                <span className="text-gray-700 text-lg">
                  Comprehensive leave history
                </span>
              </div>
            </div>

            {/* Login Buttons */}
            <div className="flex space-x-6 mt-12">
              <Link to={"/auth"}>
                <button className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2 text-lg">
                  <Users className="h-6 w-6" />

                  <span>Employee Login</span>
                </button>
              </Link>
              <Link to={"/manager/auth"}>
                <button className="px-8 py-4 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 flex items-center space-x-2 text-lg">
                  <Building2 className="h-6 w-6" />
                  <span>Manager Login</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-rose-100 rounded-3xl opacity-50"></div>
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <img
                src="/Leave_illustration.jpg"
                alt="Leave Management System"
                className="w-full h-full object-contain rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
