import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; // Import CSS file for styling
import { jwtDecode } from 'jwt-decode';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {

      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Assuming the token has a 'userId' field

      await axios.post('http://localhost:5000/api/blogs', { title, content, userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/'); // Redirect to home after successful post creation
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="create-post-left">
          <img src="left2.jpg" alt="Create Post" />
        </div>
        <div className="create-post-right">
          <form onSubmit={handleSubmit} className="create-post-form">
            <h2>Create Post</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="button-container">
              <button type="submit" className="submit-button">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
