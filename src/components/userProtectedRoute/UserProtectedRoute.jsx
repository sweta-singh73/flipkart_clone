import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user'); // For user-specific routes

  // Check if userToken exists to allow access to user pages
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;

