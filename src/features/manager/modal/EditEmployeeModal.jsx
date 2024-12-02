import { X } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";

const EditEmployeeModal = ({ employee, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.first_name || "",
        lastName: employee.last_name || "",
        userName: employee.username || "",
        department: employee.department || "",
        email: employee.email || "",
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee.id, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.userName,
      email: formData.email,
      department: formData.department,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Username", name: "userName", type: "text" },
              { label: "Department", name: "department", type: "text" },
              { label: "Email", name: "email", type: "email" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
