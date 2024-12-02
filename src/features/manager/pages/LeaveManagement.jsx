import React, { useEffect, useState } from "react";
import { Filter, Eye } from "lucide-react";
import useLeaves from "../../employee/hooks/useLeaves";
import { DateFormat } from "../../../utils/format";
import api from "../../../services/api";
import { showToast } from "../../../utils/showToast";
import useLeaveTypes from "../hooks/useLeaveTypes";
import LeaveDetailModal from "../modal/LeaveDetailModal";

const LeaveManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLeaveType, setFilterLeaveType] = useState("all");

  const { leaves, getLeaves } = useLeaves();
  const { leaveTypes } = useLeaveTypes();

  console.log("leave  =====", leaves);
  console.log("leave types  =====", leaveTypes);

  useEffect(() => {
    const filters = {};
    if (filterStatus !== "all") filters.status = filterStatus;
    if (filterLeaveType !== "all") filters.leave_type__name = filterLeaveType;

    getLeaves(filters);
  }, [filterStatus, filterLeaveType]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleAddComment = async (comment) => {
    console.log("commmmeeet ===", comment);

    try {
      const res = await api.patch(`api/leave-request/${selectedRequest.id}/`, {
        comment,
      });
      console.log(res);
      showToast(200, "Comment Added...");
      getLeaves();
    } catch (error) {
      console.log(error);
      showToast(400, "Failed to comment");
    }
  };

  const handleLeaveRequest = async (status) => {
    try {
      const res = await api.patch(`api/leave-request/${selectedRequest.id}/`, {
        status,
      });
      console.log(res);
      getLeaves();
      showToast(200, `${status.charAt(0).toUpperCase() + status.slice(1)}!`);
      setShowDetailModal(false);
    } catch (error) {
      console.log(error);
      showToast(400, "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Leave Approval Management
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-lg bg-white px-4 py-2 shadow-sm">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="ml-2 border-none bg-transparent outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
            value={filterLeaveType}
            onChange={(e) => setFilterLeaveType(e.target.value)}
          >
            <option value="all">All Leave Types</option>
            {leaveTypes &&
              leaveTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="rounded-lg bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 font-semibold text-gray-600">Employee</th>
              <th className="p-4 font-semibold text-gray-600">Leave Type</th>
              <th className="p-4 font-semibold text-gray-600">Duration</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves &&
              leaves.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-800 capitalize">
                        {request.employee.username}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {request.employee.department}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 capitalize">
                    {request.leave_type_detail.name}
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-600">
                      {request.start_date
                        ? DateFormat(request.start_date)
                        : "N/A"}{" "}
                      -{" "}
                      {request.end_date ? DateFormat(request.end_date) : "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Applied:{" "}
                      {request.created_at
                        ? DateFormat(request.created_at)
                        : "N/A"}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowDetailModal(true);
                      }}
                      className="flex items-center text-red-600 hover:text-red-700"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <LeaveDetailModal
        selectedRequest={selectedRequest}
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onLeaveRequest={handleLeaveRequest}
        onAddComment={(comment) => handleAddComment(comment)}
      />
    </div>
  );
};

export default LeaveManagement;
