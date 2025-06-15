import api from './axios';

export const createPost = async (formData, token) => {
  const res = await api.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};


export const getPosts = async (page = 1, limit = 5) => {
  const res = await api.get(`/posts?page=${page}&limit=${limit}`);
  return res.data;
};


export const updatePost = async (postId, formData, token) => {
  try {
    const res = await api.put(`/posts/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

import axios from 'axios';

export const deletePost = async (postId, token) => {
  try {
    const res = await api.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete post");
  }
};
