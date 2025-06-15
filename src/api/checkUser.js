// api/checkUser.js
import api from "./axios";

export const checkUserAvailability = async (data) => {
  const res = await api.post('/auth/check', data);
  return res.data;
};