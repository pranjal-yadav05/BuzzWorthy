import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        username,
        email,
        password
      });
      console.log(response.data); // Handle successful signup
      navigate('/signin');
    } catch (err) {
      setError(err.response.data.message);
    }finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  return (
    <div className="signin-container">
      {
        loading ? ( // Show loading screen if data is being fetched
        <img style={{ margin:'0', borderRadius:'20px' ,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)', width:'100px'}} src='copy.gif'/>
      
      ) :( <>
        <div className="signin-left">
      </div>
      <div className="signin-right">
        <div className="signin-box">
          <form onSubmit={handleSubmit} className="signin-form">
            <h2>Sign-Up</h2>
            {error && <p className="error-message">{error}</p>}
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button className='subbtn' type="submit">Sign Up</button>

            <i style={{color:'white'}}><br/>Already have an account ? <Link to={'/signin'}>Sign-in here</Link></i>
          </form>
        </div>
      </div>
      </>)
      }
      
    </div>
  );
};

export default SignUp;
