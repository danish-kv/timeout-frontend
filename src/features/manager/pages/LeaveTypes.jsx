import React, { useState } from "react";
import {
  Plus,
  Pencil,
  X,
  Check,
  Shield,
  ShieldBan,
} from "lucide-react";
import api from "../../../services/api";
import useLeaveTypes from "../hooks/useLeaveTypes";
import { showToast } from "../../../utils/showToast";

const LeaveTypes = () => {
  const { leaveTypes, getLeaveTyeps, loading } = useLeaveTypes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  const handleAddNew = async () => {
    setEditingType(null);
    setFormData({
      name: "",
      description: "",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (leaveType) => {
    setEditingType(leaveType);
    setFormData({
      name: leaveType.name,
      description: leaveType.description,
      is_active: leaveType.is_active,
    });
    setIsModalOpen(true);
  };

  const handleBlock = async (id, current_status) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      try {
        const res = await api.patch(`api/leave-type/${id}/`, {
          is_active: !current_status,
        });
        console.log(res);
        getLeaveTyeps();

        showToast(200, "Updated status");
      } catch (error) {
        console.log(error);
        showToast(400, "Failed change status");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingType) {
      try {
        const res = await api.patch(
          `api/leave-type/${editingType.id}/`,
          formData
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await api.post("api/leave-type/", formData);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaveTyeps();
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leave Types</h1>
          <p className="text-gray-600">
            Manage organization leave types and policies
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Leave Type
        </button>
      </div>

      {/* Leave Types Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveTypes.map((type) => (
              <tr key={type.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{type.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {type.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      type.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {type.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(type)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleBlock(type.id, type.is_active)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {type.is_active ? (
                      <ShieldBan className="h-5 w-5" />
                    ) : (
                      <Shield className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingType ? "Edit Leave Type" : "Add Leave Type"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Leave Type Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="3"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {editingType ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypes;
