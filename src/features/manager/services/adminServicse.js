import api from "../../../services/api";

export const fetchEmployees = async (searchTerm = "") => {
  const res = await api.get("api/users", {
    params: {
      search: searchTerm,
    },
  });
  console.log(res);
  return res.data;
};

export const fetchLeaveType = async () => {
  const res = await api.get("api/leave-type");
  console.log(res);
  return res.data;
};

export const fetchDashboard = async () => {
  const res = await api.get("api/dashboard");
  console.log(res);
  return res.data;
};
