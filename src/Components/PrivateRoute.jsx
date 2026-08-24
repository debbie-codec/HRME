import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  try {
    const user = sessionStorage.getItem('hrme_currentUser');
    return user ? children : <Navigate to="/login" replace />;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
}
