import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header({ onSearchChange }) {
  
  const navigate = useNavigate();

  const signOut = ()=>{
    localStorage.removeItem('token');
    navigate('/signin'); // Redirect to the signin page after signout
  }

  return (
    <nav style={{backgroundColor:'#35185A',color:'white'}} className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <img 
          src='logo-no-background.png' 
          width={'120px'} 
          className="navbar-brand" 
          to="/"
        />
        <button
          className="navbar-toggler"
          style={{backgroundColor:'white'}}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span  className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link style={{color:'white'}} className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link style={{color:'white'}} className="nav-link active" aria-current="page" to="/my-profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              {localStorage.getItem('token') ? (
                <i style={{color:'white'}}  onClick={signOut} className="nav-link">Sign Out</i>
              ) : (
                <Link style={{color:'white'}}  to="/signin" className="nav-link">Sign In</Link>
              )}
            </li>
          </ul>
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              style={{backgroundColor:'#B19DD0'}}
              placeholder="Search"
              aria-label="Search"
              onChange={onSearchChange} 
            />
            <button style={{backgroundColor:'black',color:'white'}} className="btn" type="submit">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
