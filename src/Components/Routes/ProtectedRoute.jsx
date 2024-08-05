import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // if user try to access protected route without login
  if (localStorage.getItem('token'))
     {
       return children;
     } 
  else 
    {
      return <Navigate to="/" />;
    }   
}