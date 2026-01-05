import React from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';

function ProtectedRoute({ children }) {
  if (!authUtils.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;