import React from "react";
import { Calendar, Clock, Paperclip, Download, Plus } from "lucide-react";
import useLeaves from "../hooks/useLeaves";
import { DateFormat } from "../../../utils/format";

const LeaveHistory = ({onNewRequest}) => {
  const { leaves } = useLeaves();

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 ring-green-600/20";
      case "pending":
        return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
      case "rejected":
        return "bg-red-100 text-red-800 ring-red-600/20";
      default:
        return "bg-gray-100 text-gray-800 ring-gray-600/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Leave History
              </h1>
              <p className="text-gray-500 mt-1">
                Track and manage your leave requests
              </p>
            </div>
            <button
        onClick={onNewRequest}
        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Leave Request
        </button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-red-600 text-sm font-medium">
                Total Leaves
              </div>
              <div className="text-2xl font-bold text-red-900 mt-1">
                {leaves.length}
              </div>
            </div>
            <div className="bg-red-50/80 rounded-lg p-4">
              <div className="text-red-600 text-sm font-medium">
                Pending Requests
              </div>
              <div className="text-2xl font-bold text-red-900 mt-1">
                {
                  leaves.filter(
                    (leave) => leave.status.toLowerCase() === "pending"
                  ).length
                }
              </div>
            </div>
            <div className="bg-red-50/60 rounded-lg p-4">
              <div className="text-red-600 text-sm font-medium">
                Approved Leaves
              </div>
              <div className="text-2xl font-bold text-red-900 mt-1">
                {
                  leaves.filter(
                    (leave) => leave.status.toLowerCase() === "approved"
                  ).length
                }
              </div>
            </div>
          </div>
        </div>

        {/* Leave Cards */}
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 rounded-lg p-3">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {leave.leave_type_detail.name}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                            leave.status
                          )}`}
                        >
                          {leave.status}
                        </span>
                      </div>
                      <p className="text-gray-500 mt-1">{leave.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2 text-red-400" />
                    <span>
                      {DateFormat(leave.start_date)} -{" "}
                      {DateFormat(leave.end_date)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Duration:</span>
                      {calculateDuration(leave.start_date, leave.end_date)} days
                    </div>
                  </div>
                  {leave.attachment ? (
                    <div className="flex items-center text-sm text-red-600 hover:text-red-800">
                      <Paperclip className="h-4 w-4 mr-2" />
                      <a
                        href={leave.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Attachment
                      </a>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No Attachment</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
