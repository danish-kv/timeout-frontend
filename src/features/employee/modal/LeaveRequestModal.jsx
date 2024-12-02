import React, { useState } from "react";
import { Upload, XCircle, Calendar, Loader2} from "lucide-react";
import useLeaveType from "../hooks/useLeaveType";

const LeaveRequestModal = ({
  onClose,
  leaveRequestData,
  setLeaveRequestData,
  isSubmitting,
  onSubmit
}) => {
  const [dragActive, setDragActive] = useState(false);
  const { leaveTypes } = useLeaveType()
console.log('leave tupes === ', leaveTypes);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  
    const file = e.dataTransfer.files[0];
    if (file) {
      setLeaveRequestData((prev) => ({ ...prev, attachment: file }));
    }
  };

  
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            New Leave Request
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Leave Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Leave Type
                </label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 appearance-none bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                    value={leaveRequestData.leave_type}
                    onChange={(e) =>
                      setLeaveRequestData({
                        ...leaveRequestData,
                        leave_type: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Leave Type</option>
                    {leaveTypes.map((type) => (
                      <option key={type.id} value={type.id} className="capitalize">
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Leave Duration
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                      value={leaveRequestData.start_date}
                      onChange={(e) =>
                        setLeaveRequestData({
                          ...leaveRequestData,
                          start_date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                      value={leaveRequestData.end_date}
                      onChange={(e) =>
                        setLeaveRequestData({
                          ...leaveRequestData,
                          end_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reason for Leave */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Reason for Leave
              </label>
              <textarea
                className="w-full border border-gray-200 rounded-lg px-4 py-3 min-h-[120px] focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none resize-none"
                placeholder="Please provide a detailed reason for your leave request..."
                value={leaveRequestData.reason}
                onChange={(e) =>
                  setLeaveRequestData({
                    ...leaveRequestData,
                    reason: e.target.value,
                  })
                }
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Supporting Documents
              </label>
              <div
                className={`border-2 border-dashed rounded-lg transition-colors ${
                  dragActive
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="px-6 py-8 flex flex-col items-center justify-center gap-3">
                  <Upload
                    className={`h-8 w-8 ${
                      dragActive ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Drag & drop your files here, or{" "}
                      <label className="text-red-500 hover:text-red-600 cursor-pointer">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setLeaveRequestData({
                              ...leaveRequestData,
                              attachment: e.target.files?.[0],
                            })
                          }
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported files: PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              {leaveRequestData.attachment && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex-1 truncate">
                    Selected: {leaveRequestData.attachment.name}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLeaveRequestData({
                        ...leaveRequestData,
                        attachment: null,
                      })
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            // disabled={isSubmitting}
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center"
          >
            {isSubmitting && (
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            )}
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
