import { X } from "lucide-react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UserValidation } from "../../../validation/YupSchema";

const EditEmployeeModal = ({ employee, onClose, onSubmit }) => {
  const initialValues = {
    firstName: employee?.first_name || "",
    lastName: employee?.last_name || "",
    userName: employee?.username || "",
    department: employee?.department || "",
    email: employee?.email || "",
  };

  const handleSubmit = (values) => {
    onSubmit(employee.id, {
      first_name: values.firstName,
      last_name: values.lastName,
      username: values.userName,
      email: values.email,
      department: values.department,
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
        <Formik
          initialValues={initialValues}
          validationSchema={UserValidation}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {() => (
            <Form className="space-y-4">
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
                    <Field
                      name={name}
                      type={type}
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="mt-1 text-sm text-red-600"
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
