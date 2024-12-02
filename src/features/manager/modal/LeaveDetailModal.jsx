import React, { useState } from "react";
import { X } from "lucide-react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Leave Request Details</h2>
          <button
            onClick={onClose}
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
              <h3 className="text-sm font-medium text-gray-500">Leave Type</h3>
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
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Comments</h3>
              <textarea
                disabled={isCommentDisabled}
                value={isCommentDisabled ? selectedRequest.comment : comment}
                onChange={
                  !isCommentDisabled
                    ? (e) => setComment(e.target.value)
                    : undefined
                }
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
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
        <div className="mt-6 flex justify-end space-x-3">
          {selectedRequest.status === "pending" && (
            <>
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
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
