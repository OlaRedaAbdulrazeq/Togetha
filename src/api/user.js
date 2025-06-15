import api from './axios';

//Register User
export const registerUser = (formData) => {
  return api.post('/auth/register', formData, {
    headers: {
      'Content-Type': 'application/json', 
    },
  }).then(res => res.data);
};

// api/user.js
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials); // Adjust path as needed
  return res.data;
};

// Update User Profile
export const editUserProfile = (formData, token) => {
  return api.put('/users/profile', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
};

// api/user.js
export const getProfile = (token) => {
  return api
    .get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
};