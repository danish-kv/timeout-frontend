import React, { useState } from "react";
import { X, Paperclip, Download, File } from "lucide-react";
import { DateFormat } from "../../../utils/format";

const LeaveDetailModal = ({
  selectedRequest,
  show,
  onClose,
  onLeaveRequest,
  onAddComment,
}) => {
  const [comment, setComment] = useState("");

  if (!show || !selectedRequest) return null;

  const handleComment = async () => {
    if (!comment.trim()) {
      showToast(400, "Comment cannot be empty");
      return;
    }
    await onAddComment(comment);
    setComment("");
    onClose();
  };

  const isCommentDisabled =
    selectedRequest.status === "approved" ||
    selectedRequest.status === "rejected";

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center justify-between border-b border-red-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-red-900">
              Leave Request Details
            </h2>
            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(
                selectedRequest.status
              )}`}
            >
              {selectedRequest.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 bg-red-50 rounded-lg">
          <div className="space-y-4 ">
            {/* Employee Information Section */}
            <div className="rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">
                Employee Information
              </h3>
              <p className="mt-1 text-lg font-medium capitalize text-red-800">
                {selectedRequest.employee.username}
              </p>
              <p className="text-sm text-red-700 capitalize">
                {selectedRequest.employee.department}
              </p>
            </div>

            {/* Leave Period Section */}
            <div className="rounded-lg  p-4">
              <h3 className="text-sm font-medium text-red-900">Leave Period</h3>
              <p className="mt-1 text-sm text-red-800">
                {selectedRequest.start_date
                  ? DateFormat(selectedRequest.start_date)
                  : "N/A"}{" "}
                to{" "}
                {selectedRequest.end_date
                  ? DateFormat(selectedRequest.end_date)
                  : "N/A"}
              </p>
              <p className="mt-1 text-sm text-red-700">
                Applied on:{" "}
                {selectedRequest.created_at
                  ? DateFormat(selectedRequest.created_at)
                  : "N/A"}
              </p>
            </div>

            {/* Leave Type Section */}
            <div className="rounded-lg  p-4">
              <h3 className="text-sm font-medium text-red-900">Leave Type</h3>
              <p className="mt-1 text-sm text-red-800">
                {selectedRequest.leave_type_detail.name}
              </p>
            </div>

            {/* Reason Section */}
            <div className="rounded-lg  p-4">
              <h3 className="text-sm font-medium text-red-900">Reason</h3>
              <p className="mt-1 text-sm text-red-800">
                {selectedRequest.reason}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Attachments Section */}
            <div className="rounded-lg  p-4">
              <h3 className="mb-2 text-sm font-medium text-red-900">
                <Paperclip className="mr-1 inline-block h-4 w-4" />
                Attachments
              </h3>
              {selectedRequest.attachment ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border border-red-200 bg-white p-2">
                    <div className="flex items-center">
                      <File className="mr-2 h-4 w-4 text-red-600" />

                      <span className="text-sm text-red-800">
                        {selectedRequest.attachment.split("/").pop() ||
                          "Attachment"}
                      </span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={selectedRequest.attachment}
                      aria-label="Download attachment"
                    >
                      <button className="rounded-full p-1 hover:bg-red-100">
                        <Download className="h-4 w-4 text-red-600" />
                      </button>
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-700">No attachments uploaded</p>
              )}
            </div>

            {/* Comments Section */}
            <div className="rounded-lg  p-4">
              <h3 className="text-sm font-medium text-red-900">Comments</h3>
              <textarea
                disabled={isCommentDisabled}
                value={isCommentDisabled ? selectedRequest.comment : comment}
                onChange={
                  !isCommentDisabled
                    ? (e) => setComment(e.target.value)
                    : undefined
                }
                className="mt-1 w-full rounded-lg border border-red-200 bg-white p-2 text-sm text-red-800 placeholder-red-400"
                rows={4}
                placeholder={
                  isCommentDisabled
                    ? "No Comments!"
                    : "Add your comments here..."
                }
              />
            </div>

            {!isCommentDisabled && (
              <div className="flex justify-end">
                <button
                  onClick={handleComment}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          {selectedRequest.status === "pending" && (
            <>
              <button
                onClick={onClose}
                className="rounded-lg border border-red-300 px-4 py-2 text-red-700 hover:bg-red-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onLeaveRequest("rejected")}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => onLeaveRequest("approved")}
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

export default LeaveDetailModal;