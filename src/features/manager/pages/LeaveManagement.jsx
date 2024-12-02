import React, { useState } from "react";
import { Calendar, Filter, X, Eye } from "lucide-react";
import useLeaves from "../../employee/hooks/useLeaves";
import { DateFormat } from "../../../utils/format";
import api from "../../../services/api";
import { showToast } from "../../../utils/showToast";
import useLeaveTypes from "../hooks/useLeaveTypes";

const LeaveManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const { leaves, getLeaves } = useLeaves();
  const { leaveTypes } = useLeaveTypes();

  console.log("llvares  =====", leaves);
  console.log("leave types  =====", leaveTypes);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const DetailModal = () => {
    const [comment, setComment] = useState("");

    if (!selectedRequest) return null;

    console.log("selected request ===", selectedRequest);

    const handleAddComment = () => {
      try {
        const res = api.patch(
          `api/leave-request/${selectedRequest.id}/`,
          comment
        );
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
        const res = await api.patch(
          `api/leave-request/${selectedRequest.id}/`,
          { status: status }
        );
        console.log(res);
        getLeaves();

        showToast(200, "Okey");
      } catch (error) {
        console.log(error);
        showToast(400, "Failed ");
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-3xl rounded-lg bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Leave Request Details</h2>
            <button
              onClick={() => setShowDetailModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Employee Information
                </h3>
                <p className="mt-1 text-lg font-medium capitalize">
                  {selectedRequest.employee.username}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  {selectedRequest.employee.department}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Leave Period
                </h3>
                <p className="mt-1 text-sm text-gray-800">
                  {selectedRequest.start_date
                    ? DateFormat(selectedRequest.start_date)
                    : "N/A"}{" "}
                  to{" "}
                  {selectedRequest.end_date
                    ? DateFormat(selectedRequest.end_date)
                    : "N/A"}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Applied on:{" "}
                  {selectedRequest.created_at
                    ? DateFormat(selectedRequest.created_at)
                    : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Leave Type
                </h3>
                <p className="mt-1 text-sm text-gray-800">
                  {selectedRequest.leave_type_detail.name}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                <p className="mt-1 text-sm text-gray-800">
                  {selectedRequest.reason}
                </p>
              </div>
            </div>

            {selectedRequest.status === "approved" ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Comments
                  </h3>
                  <textarea
                    disabled
                    value={comment}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    rows={4}
                    placeholder="No Comments!"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Comments
                  </h3>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    rows={4}
                    placeholder="Add your comments here..."
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {selectedRequest.status === "pending" && (
              <>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleLeaveRequest("rejected")}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleLeaveRequest("approved")}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Leave Approval Management
        </h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50">
            <Calendar className="mr-2 h-5 w-5" />
            View Calendar
          </button>
        </div>
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
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Leave Types</option>
            {leaveTypes &&
              leaveTypes.map((type) => (
                <option value={type.name}>{type.name}</option>
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

      {/* Detail Modal */}
      {showDetailModal && <DetailModal />}
    </div>
  );
};

export default LeaveManagement;
