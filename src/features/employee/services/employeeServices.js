import api from "../../../services/api"

export const fetchProfile = async() => {
    const res = await api.get('api/profile/')
    return res.data
}

export const fetchLeaveType = async() => {
    const res = await api.get('api/leave-type/')
    return res.data
}

export const fetchLeaves = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const res = await api.get(`api/leave-request/?${query}`);
    return res.data;
  };
  