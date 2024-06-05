import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
      </div>
      <div className="signin-right">
      <div className="signin-box">
        <form onSubmit={handleSubmit} className="signin-form">
          <h2>Sign-In</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='subbtn' type="submit">Sign In</button>

          <i style={{color:'white'}}><br/>New here ? <Link to={'/signup'}>Sign-up here</Link></i>
        </form>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
