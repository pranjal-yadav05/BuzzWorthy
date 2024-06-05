import React from 'react';
import {Navigate, Route, Redirect } from 'react-router-dom';

// Mock function to check if the user is authenticated
// Replace this with your actual authentication check
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
  };
  
export default ProtectedRoute;
