import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  return localStorage.getItem("isLoggedIn") ? children : <Navigate to="/" />;
};

export default PrivateRoute;
