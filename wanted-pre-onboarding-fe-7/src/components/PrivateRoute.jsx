import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, path }) => {
  const token = localStorage.getItem('token');
  if (path === '/') {
    return token ? <Navigate to={'/todo'} /> : children;
  } else if (path === '/todo') {
    return token ? children : <Navigate to={'/'} />;
  }
};

export default PrivateRoute;
