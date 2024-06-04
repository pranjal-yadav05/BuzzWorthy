import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllBlogs } from './apiService';
import './Home.css'; // Import CSS file for styling

const Home = ({ searchQuery }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [blogs, searchQuery]);

  return (
    <div className="home-container">
      {/* Render filtered blog posts */}
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="post-container"
          >
            <div className="post">
              <h2 className="post-title">{blog.title}</h2>
              <div className="post-content">{blog.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}</div>
              <div className="post-footer">
                <span className="post-info">
                  <img src={blog.profileImage} alt={blog.author.name} className="profile-image" /> {/* Profile image */}
                  By {blog.author.name}
                </span>
                <span className="post-date">Date: {new Date(blog.date).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="no-posts">No blog posts available.</p>
      )}
    </div>
  );
};

export default Home;
