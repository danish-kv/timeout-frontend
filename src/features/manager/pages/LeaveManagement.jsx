import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown, X, Check, AlertCircle, Eye, MessageSquare } from 'lucide-react';

const LeaveManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data
  const leaveRequests = [
    {
      id: 1,
      employee: 'John Doe',
      department: 'Engineering',
      type: 'Annual Leave',
      startDate: '2024-12-01',
      endDate: '2024-12-05',
      status: 'pending',
      reason: 'Family vacation',
      appliedOn: '2024-11-25',
      conflicts: ['Jane Smith (02-03 Dec)'],
      documents: [],
      team: 'Frontend'
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      department: 'Design',
      type: 'Sick Leave',
      startDate: '2024-12-03',
      endDate: '2024-12-04',
      status: 'approved',
      reason: 'Doctor appointment',
      appliedOn: '2024-11-26',
      conflicts: [],
      documents: ['medical-certificate.pdf'],
      team: 'UI/UX'
    },
    {
      id: 3,
      employee: 'Mike Brown',
      department: 'Marketing',
      type: 'Personal Leave',
      startDate: '2024-12-06',
      endDate: '2024-12-06',
      status: 'rejected',
      reason: 'Personal errands',
      appliedOn: '2024-11-24',
      conflicts: ['Team Meeting'],
      documents: [],
      team: 'Content'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const DetailModal = () => {
    const [comment, setComment] = useState('');
    
    if (!selectedRequest) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-3xl rounded-lg bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Leave Request Details</h2>
            <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Employee Information</h3>
                <p className="mt-1 text-lg font-medium">{selectedRequest.employee}</p>
                <p className="text-sm text-gray-600">{selectedRequest.department} - {selectedRequest.team}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Leave Period</h3>
                <p className="mt-1 text-sm text-gray-800">
                  {selectedRequest.startDate} to {selectedRequest.endDate}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Applied on: {selectedRequest.appliedOn}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Leave Type</h3>
                <p className="mt-1 text-sm text-gray-800">{selectedRequest.type}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                <p className="mt-1 text-sm text-gray-800">{selectedRequest.reason}</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedRequest.conflicts.length > 0 && (
                <div className="rounded-lg bg-red-50 p-4">
                  <h3 className="flex items-center font-medium text-red-800">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Scheduling Conflicts
                  </h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-red-700">
                    {selectedRequest.conflicts.map((conflict, index) => (
                      <li key={index}>{conflict}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRequest.documents.length > 0 && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="font-medium text-gray-700">Attached Documents</h3>
                  <ul className="mt-2 space-y-2">
                    {selectedRequest.documents.map((doc, index) => (
                      <li key={index} className="flex items-center text-sm text-blue-600">
                        <a href="#" className="hover:underline">{doc}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-500">Comments</h3>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                  rows={4}
                  placeholder="Add your comments here..."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            {selectedRequest.status === 'pending' && (
              <>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Approve
                </button>
              </>
            )}
            {selectedRequest.status === 'approved' && (
              <button
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Cancel Leave
              </button>
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
        <h1 className="text-2xl font-bold text-gray-800">Leave Approval Management</h1>
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
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Leave Types</option>
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Personal Leave</option>
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
              <th className="p-4 font-semibold text-gray-600">Conflicts</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-800">{request.employee}</div>
                    <div className="text-sm text-gray-500">{request.department}</div>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{request.type}</td>
                <td className="p-4">
                  <div className="text-sm text-gray-600">
                    {request.startDate} - {request.endDate}
                  </div>
                  <div className="text-xs text-gray-500">Applied: {request.appliedOn}</div>
                </td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  {request.conflicts.length > 0 ? (
                    <span className="flex items-center text-red-600">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {request.conflicts.length}
                    </span>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowDetailModal(true);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-700"
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