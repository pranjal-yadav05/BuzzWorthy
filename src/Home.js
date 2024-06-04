import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllBlogs, addLike } from './apiService';
import './Home.css'; // Import CSS file for styling

const Home = ({ searchQuery }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const userId = '60b8d6c72e35f2b6c4d0e6c5'; 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    try {
      // Send a request to like the blog post with postId and userId
      const response = await addLike(blogId, userId); // Pass userId to addLike function
      
      // Update the state to reflect the new number of likes and liked status
      if(response.message != "User has already liked this post")
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, likes: blog.likes + 1, likedByUser: true }
            : blog
        )
      );
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [blogs, searchQuery]);

  return (
    <div className="content-container">
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
                <img
                      src={blog.author.profileImage}
                      alt={blog.author.name}
                      className="profile-image"
                    /> {/* Profile image */}
                  By {blog.author.name}
                </span>
                <span className="post-date">Date: {new Date(blog.date).toLocaleDateString('en-GB')}</span>
               
                
              </div>
              <img
                src='positive-vote.png'
                width={'20px'}
                style={{marginRight:'5px'}}
                onClick={() => handleLike(blog._id)}
              />
                  <span className="likes-count">{blog.likes}</span>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="no-posts">No blog posts available.</p>
      )}
    </div>
    </div>
  );
};

export default Home;
