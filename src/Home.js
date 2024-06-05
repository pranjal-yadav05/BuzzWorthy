import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getAllBlogs, addLike, addComment, getCommentsByBlogId } from './apiService';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { jwtDecode }from 'jwt-decode';
import './Home.css'; // Import CSS file for styling

const Home = ({ searchQuery }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [Liked,setLiked] = useState(null);
  const [comments, setComments] = useState({});
  const [currentBlogId,setCurrentBlogId] = useState(null);
  const [newComment, setNewComment] = useState('');
  // const [username, setUsername] = useState('');
  const commentsEndRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId); // Assuming the token has a 'userId' field
      // setUsername(decodedToken.username);
    }

    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    try {
      console.log(userId)
      if (userId == null) {
        setShowModal(true); // Show the modal instead of using confirm
        return;
      }
      // Send a request to like the blog post with postId and userId
      const response = await addLike(blogId, userId); // Pass userId to addLike function
      if(response.message === "User has already liked this post"){
        alert('already liked once');
      }
      // Update the state to reflect the new number of likes and liked status
      if(response.message != "User has already liked this post")
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId
            ? { ...blog, likes: blog.likes + 1}
            : blog
        )
      );
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
  
    const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
  
    return `${formattedTime} ${formattedDate} `;
  };
  

  const handleCreatePost = () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      navigate('/create-post'); // Redirect to create post page
    } else {
      navigate('/signin'); // Redirect to sign-in page
    }
  };

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [blogs, searchQuery]);

  const handleShowComments = async (blogId) => {
    setCurrentBlogId(blogId);
    try {
      const response = await getCommentsByBlogId(blogId);
      setComments(response);
      setShowCommentModal(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    // if (newComment.trim() === '') return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }
      const decodedToken = jwtDecode(token);
      const username = decodedToken.username; // assuming the token has a 'username' field
      const response = await addComment({
        blogId: currentBlogId,
        userId: userId,
        username: username,
        content: newComment.trim(),
      });
      setComments((prevComments) => [...prevComments, {
        blogId: currentBlogId,
        userId: userId,
        username: username,
        content: newComment.trim(),
      }]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    // Scroll to bottom whenever comments update
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  return (
    <div className="content-container">
      <div className="home-container">
      <button style={{marginBottom:'20px',padding:'10px'}} onClick={handleCreatePost} className="create-post-button">Create Post</button>
        {loading ? ( // Show loading screen if data is being fetched
          <img style={{ margin:'0', borderRadius:'20px' ,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)', width:'100px'}} src='copy.gif'/>
        
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="post-container"
            >
              <div className="post">
                <h2 className="post-title">{blog.title}</h2>
                <div className="post-content">
                  {blog.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </div>
                <div className="post-footer">
                  <span className="post-info">
                    {blog.author && (
                      <>
                        By
                        <img
                          src={blog.author.profileImage}
                          alt={blog.author.username}
                          className="profile-image"
                        />{' '}
                      </>
                    )}
                   <Link className='linking' to={`/user/${blog.author?.username}`}>{blog.author?.username}</Link>
                  </span>
                  <span className="post-date">Date: {new Date(blog.date).toLocaleDateString('en-GB')}</span>
                </div>

                <img
                  src='positive-vote.png'
                  width={'20px'}
                  style={{ marginRight: '5px', cursor: 'pointer' }}
                  onClick={() => handleLike(blog._id)}
                  alt="like button"
                />
                <span className="likes-count">{blog.likes}</span>
                <i>{Liked}</i>
                <img className='commentBtn' src='comments.png' onClick={() => handleShowComments(blog._id)}/>
              </div>


            </motion.div>
          ))
        ) : (
          <p className="no-posts">No blog posts available.</p>
        )}
      </div>
      {showCommentModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={() => setShowCommentModal(false)}> &times; </button>
              <div className="comments-section">
                <h3>Comments</h3>
                <div style={{ overflowY: 'scroll', maxHeight: '300px' }}>
                  {comments.map((comment) => (
                    <div key={comment._id} className="comment">
                    <strong>{comment.username} : <i style={{fontWeight:'2', marginLeft:'10px'}}> {formatDateTime(comment.createdAt)}</i></strong>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <i>No comments yet</i>
                  )}
                  <div ref={commentsEndRef} />
                </div>
                <input
                  value={newComment}
                  style={{ width: '80%', padding: '10px', borderRadius: '10px' }}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
              </div>
            </div>
          </div>
        )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Please sign in to like.</p>
            <div className="modal-buttons">
              <button onClick={() => navigate('/signin')}>Sign In</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
