import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/employeeServices";

const useProfile = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchProfile();
      setProfile(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return { profile, loading, errors, getProfile };
};

export default useProfile;
