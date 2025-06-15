import api from './axios';

export const registerUser = (formData) => {
  return api.post('/auth/register', formData, {
    headers: {
      'Content-Type': 'application/json', 
    },
  }).then(res => res.data);
};


export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials); 
  return res.data;
};


export const editUserProfile = (formData, token) => {
  return api.put('/users/profile', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
};


export const getProfile = (token) => {
  return api
    .get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
};