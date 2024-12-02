import { useEffect, useState } from "react";
import { fetchLeaves } from "../services/employeeServices";

const useLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getLeaves = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await fetchLeaves(filters);
      setLeaves(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaves(); 
  }, []);

  return { leaves, loading, errors, getLeaves };
};

export default useLeaves;
