// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllBlogs = async () => {
  const response = await axios(`${BASE_URL}/blogs`);
  if (response.status != 200) {
    console.log(response)
    throw new Error('Failed to fetch blogs');
  }
  console.log(response)
  return response;

};

export const getBlogById = async (id) => {
  const response = await axios(`${BASE_URL}/blogs/${id}`);
  if (response.status != 200) {
    throw new Error('Failed to fetch blog');
  }
  return response;
};

export const addBlog = async (blogData) => {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    throw new Error('Failed to add blog');
  }
  return response.json();
};
