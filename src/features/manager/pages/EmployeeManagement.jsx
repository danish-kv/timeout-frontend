import React, { useState } from 'react';
import { Search, Plus, Edit, Trash, X, ChevronDown } from 'lucide-react';

const EmployeeManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Sample data
  const employees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      manager: 'Sarah Wilson',
      role: 'Software Engineer',
      quotas: {
        annual: 20,
        sick: 10,
        personal: 5
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Design',
      manager: 'Mike Johnson',
      role: 'UI Designer',
      quotas: {
        annual: 20,
        sick: 10,
        personal: 5
      }
    }
  ];

  const managers = [
    { id: 1, name: 'Sarah Wilson' },
    { id: 2, name: 'Mike Johnson' },
    { id: 3, name: 'David Brown' }
  ];

  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'Sales',
    'HR'
  ];

  const AddEmployeeModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Employee</h2>
          <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Department</label>
              <select className="w-full rounded-lg border border-gray-300 p-2">
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Assign Manager</label>
              <select className="w-full rounded-lg border border-gray-300 p-2">
                {managers.map(manager => (
                  <option key={manager.id} value={manager.id}>{manager.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Employee ID</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 p-2" />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const LeaveQuotaModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Set Leave Quotas</h2>
          <button onClick={() => setShowQuotaModal(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Annual Leave</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 p-2" defaultValue={20} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Sick Leave</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 p-2" defaultValue={10} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Personal Leave</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 p-2" defaultValue={5} />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowQuotaModal(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save Quotas
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Employee
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex flex-1 items-center rounded-lg bg-white px-4 py-2 shadow-sm">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="ml-2 flex-1 border-none bg-transparent outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Managers</option>
            {managers.map(manager => (
              <option key={manager.id} value={manager.id}>{manager.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee List */}
      <div className="rounded-lg bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 font-semibold text-gray-600">Employee</th>
              <th className="p-4 font-semibold text-gray-600">Department</th>
              <th className="p-4 font-semibold text-gray-600">Manager</th>
              <th className="p-4 font-semibold text-gray-600">Leave Quotas</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-gray-800">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {employee.department}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-gray-700">{employee.manager}</div>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowQuotaModal(true);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Quotas
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex space-x-3">
                    <button className="text-gray-400 hover:text-blue-600">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showAddModal && <AddEmployeeModal />}
      {showQuotaModal && <LeaveQuotaModal />}
    </div>
  );
};

export default EmployeeManagement;