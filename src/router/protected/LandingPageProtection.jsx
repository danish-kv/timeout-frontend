import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LandingPageProtection = ({ element }) => {
  const role = useSelector((state) => state.auth?.role);

  if (role === "manager") {
    return <Navigate to="/manager" replace />;
  } else if (role === "employee") {
    return <Navigate to="/home" replace />;
  }

  return element; 
};

export default LandingPageProtection;
