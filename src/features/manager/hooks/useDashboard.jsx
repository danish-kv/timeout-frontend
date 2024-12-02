import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../services/adminServicse";

const useDashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getDashboard = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboard();
      setDashboard(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return { dashboard, loading, errors, getDashboard };
};

export default useDashboard;