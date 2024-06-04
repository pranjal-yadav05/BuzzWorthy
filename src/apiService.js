// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error;
  }
};

export const addBlog = async (blogData) => {
  try {
    const response = await axios.post(`${BASE_URL}/blogs`, blogData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

export const addLike = async (postId, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/likes`, { postId, userId });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};
