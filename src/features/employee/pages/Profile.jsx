import React, { useState } from "react";
import {
  User,
  Calendar,
  FileText,
  Clock,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  XCircle,
  Plus,
} from "lucide-react";
import Header from "../components/Header";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [leaveRequestModal, setLeaveRequestModal] = useState(false);
  const [leaveRequestData, setLeaveRequestData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    attachment: null,
  });

  // Sample employee data
  const employeeData = {
    name: "Sarah Anderson",
    role: "Senior Software Engineer",
    department: "Engineering",
    email: "sarah.anderson@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 15, 2022",
    manager: "John Mitchell",
  };

  const leaveBalances = [
    { type: "Annual Leave", total: 21, used: 12, pending: 2 },
    { type: "Sick Leave", total: 10, used: 3, pending: 0 },
    { type: "Personal Leave", total: 5, used: 2, pending: 1 },
  ];

  const leaveHistory = [
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-04-15",
      endDate: "2024-04-20",
      status: "Approved",
      reason: "Family vacation",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-03-10",
      endDate: "2024-03-11",
      status: "Completed",
      reason: "Doctor appointment",
    },
  ];

  const renderLeaveRequestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            New Leave Request
          </h2>
          <button
            onClick={() => setLeaveRequestModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type
              </label>
              <select
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                value={leaveRequestData.leaveType}
                onChange={(e) =>
                  setLeaveRequestData({
                    ...leaveRequestData,
                    leaveType: e.target.value,
                  })
                }
              >
                <option value="">Select Leave Type</option>
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Duration
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                  value={leaveRequestData.startDate}
                  onChange={(e) =>
                    setLeaveRequestData({
                      ...leaveRequestData,
                      startDate: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500"
                  value={leaveRequestData.endDate}
                  onChange={(e) =>
                    setLeaveRequestData({
                      ...leaveRequestData,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Leave
            </label>
            <textarea
              className="w-full border rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-red-500"
              placeholder="Provide detailed reason for your leave request"
              value={leaveRequestData.reason}
              onChange={(e) =>
                setLeaveRequestData({
                  ...leaveRequestData,
                  reason: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Documents
            </label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <div className="flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mr-4" />
                <input
                  type="file"
                  className="text-sm text-gray-500"
                  onChange={(e) =>
                    setLeaveRequestData({
                      ...leaveRequestData,
                      attachment: e.target.files[0],
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setLeaveRequestModal(false)}
              className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-red-600">SA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {employeeData.name}
              </h1>
              <p className="text-gray-600">
                {employeeData.role} | {employeeData.department}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-md rounded-lg mb-8">
          <div className="border-b flex">
            {["overview", "leave-balance", "leave-history"].map((section) => (
              <button
                key={section}
                className={`flex-1 py-3 px-4 text-center transition-colors ${
                  activeSection === section
                    ? "border-b-2 border-red-600 text-red-600 font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section === "overview"
                  ? "Personal Details"
                  : section === "leave-balance"
                  ? "Leave Balance"
                  : "Leave History"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === "overview" && (
          <div className="bg-white shadow-md rounded-lg p-6 grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{employeeData.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{employeeData.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{employeeData.location}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span>Manager: {employeeData.manager}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Work Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>Join Date: {employeeData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span>Department: {employeeData.department}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-gray-400" />
                  <span>Role: {employeeData.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "leave-balance" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Leave Balances
              </h2>
              <button
                onClick={() => setLeaveRequestModal(true)}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Leave Request
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {leaveBalances.map((leave) => (
                <div
                  key={leave.type}
                  className="bg-gray-50 rounded-lg p-5 border"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-700">
                      {leave.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {leave.used}/{leave.total} days
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${(leave.used / leave.total) * 100}%` }}
                    ></div>
                  </div>
                  {leave.pending > 0 && (
                    <p className="text-sm text-yellow-600 mt-2">
                      {leave.pending} day{leave.pending > 1 ? "s" : ""} pending
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "leave-history" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Leave History
              </h2>
              <button className="flex items-center text-red-600 hover:text-red-700">
                <FileText className="h-5 w-5 mr-2" />
                Download History
              </button>
            </div>

            <div className="space-y-4">
              {leaveHistory.map((leave) => (
                <div
                  key={leave.id}
                  className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{leave.type}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : leave.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(leave.startDate).toLocaleDateString()} -{" "}
                      {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{leave.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leave Request Modal */}
        {leaveRequestModal && renderLeaveRequestModal()}
      </div>
    </>
  );
};

export default Profile;
