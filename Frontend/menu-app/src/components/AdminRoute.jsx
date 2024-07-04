import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.isAdmin) {
    toast.error('Unauthorized. You are not an admin');
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
