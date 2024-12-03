import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useEmployees from "../hooks/useEmplyee";
import AddEmployeeModal from "../modal/AddEmployeeModal";
import EmployeeList from "../components/EmployeeList";
import SearchBar from "../components/SearchBar";
import api from "../../../services/api";
import EditEmployeeModal from "../modal/EditEmployeeModal";
import { showToast } from "../../../utils/showToast";

const EmployeeManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { employees, errors, getEmployees } = useEmployees();

  if (!employees) {
    return null;
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      getEmployees(searchTerm);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleAddEmployee = async (data) => {
    try {
      const res = await api.post("api/register/", data);
      console.log(res);
      getEmployees();
      setShowAddModal(false);
      showToast(200, "Updated");
    } catch (error) {
      console.log(error);
      let Error = "Failed";
      if (error.response?.data?.email?.[0]) {
        Error = error.response.data.email[0];
      } else if (error.response?.data?.password?.[0]) {
        Error = error.response.data.password[0];
      } else if (error.response?.data?.username?.[0]) {
        Error = error.response.data.username[0];
      }
      showToast(400, Error);
      console.log(error);
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleUpdateEmployee = async (id, data) => {
    try {
      const res = await api.patch(`api/users/${id}/`, data);
      console.log(res);
      getEmployees();
      showToast(200, "Updated");
      setShowEditModal(false);
    } catch (error) {
      let Error = "Failed";
      if (error.response?.data?.email?.[0]) {
        Error = error.response.data.email[0];
      } else if (error.response?.data?.password?.[0]) {
        Error = error.response.data.password[0];
      } else if (error.response?.data?.username?.[0]) {
        Error = error.response.data.username[0];
      }
      showToast(400, Error);
      console.log(error);
    }
  };

  const handleStatus = async (id, currentStatus) => {
    try {
      const res = await api.patch(`api/users/${id}/`, {
        is_active: !currentStatus,
      });
      console.log(res);
      getEmployees();
      showToast(200, "Updated");
    } catch (error) {
      console.log(error);
      showToast(400, "Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Employee Management
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Employee
        </button>
      </div>

      <SearchBar onSearch={setSearchTerm} />

      <EmployeeList
        employees={employees}
        onEditEmployee={handleEditEmployee}
        onEmployeeStatus={handleStatus}
      />

      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddEmployee}
        />
      )}

      {showEditModal && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEmployee(null);
          }}
          onSubmit={handleUpdateEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
