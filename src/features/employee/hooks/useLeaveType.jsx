import React, { useEffect, useState } from "react";
import { fetchLeaveType } from "../services/employeeServices";

const useLeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getLeaveType = async () => {
    setLoading(true);
    try {
      const data = await fetchLeaveType();
      setLeaveTypes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaveType();
  }, []);

  return { leaveTypes, loading, errors, getLeaveType };
};

export default useLeaveType;
