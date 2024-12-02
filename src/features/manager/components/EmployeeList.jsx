import { Edit, Shield, ShieldBan } from "lucide-react";
import { DateFormat } from "../../../utils/format";

const EmployeeList = ({ employees, onEditEmployee, onEmployeeStatus }) => {
  if (!Array.isArray(employees)) {
    return (
      <div className="text-center py-4 text-gray-600">No employees found.</div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600">
        No employees available.
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white shadow overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4 font-semibold text-gray-600">Employee</th>
            <th className="p-4 font-semibold text-gray-600">Department</th>
            <th className="p-4 font-semibold text-gray-600">Last login</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div>
                  <div className="font-medium text-gray-800 capitalize">
                    {employee.username || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500 ">
                    {employee.email || "No email"}
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 capitalize">
                  {employee.department || "Unassigned"}
                </span>
              </td>
              <td className="p-4">
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  {employee.last_login
                    ? DateFormat(employee.last_login)
                    : "N/A"}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    employee.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEditEmployee(employee)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Edit employee"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      onEmployeeStatus(employee.id, employee.is_active)
                    }
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label={
                      employee.is_active
                        ? "Deactivate employee"
                        : "Activate employee"
                    }
                  >
                    {employee.is_active ? (
                      <ShieldBan className="h-5 w-5" />
                    ) : (
                      <Shield className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
