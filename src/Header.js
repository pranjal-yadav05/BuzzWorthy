import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
function Header({ onSearchChange }) {

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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                style={{color:'white'}}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Menu
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
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
