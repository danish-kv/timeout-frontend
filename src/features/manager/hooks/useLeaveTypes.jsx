import React, { useEffect, useState } from "react";
import { fetchLeaveType } from "../services/adminServicse";

const useLeaveTypes = () => {
  const [leaveTypes, setLeaveTyeps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getLeaveTyeps = async () => {
    setLoading(true);
    try {
      const data = await fetchLeaveType();
      setLeaveTyeps(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaveTyeps();
  }, []);

  return { leaveTypes, loading, errors, getLeaveTyeps };
};

export default useLeaveTypes;
