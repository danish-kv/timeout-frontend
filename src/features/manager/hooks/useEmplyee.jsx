import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/adminServicse";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getEmployees = async (searchTerm = "") => {
    setLoading(true);
    try {
      const data = await fetchEmployees(searchTerm);
      setEmployees(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return { employees, loading, errors, getEmployees };
};

export default useEmployees;
