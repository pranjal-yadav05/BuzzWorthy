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

export const addLike = async (blogId, userId) => {
  try {
    const postId = blogId;
    const response = await axios.post(`${BASE_URL}/likes`, { postId, userId });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/comments`, commentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const getCommentsByBlogId = async (blogId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const updateProfile = async (userData) => {
  try {
    let response;
    if (userData instanceof FormData) {
      response = await axios.put(`${BASE_URL}/profiles/update`, userData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await axios.put(`${BASE_URL}/profiles/update`, userData);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Upload profile picture
export const uploadProfilePic = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/profiles/upload-profile-pic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/profiles/current-profile`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    throw error;
  }
};

export const checkUsernameAvailability = async (username) => {
  try {
    const response = await axios.get(`/api/profiles/check-username`,{username:username});
    return response.data.available; // Assuming the response contains a boolean field 'available'
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false; // Return false by default if an error occurs
  }
};

export const getUserProfileByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/profiles/username/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};




