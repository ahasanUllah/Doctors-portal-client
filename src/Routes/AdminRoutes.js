import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoutes = ({ children }) => {
   const { user, loader } = useContext(AuthContext);
   const [isAdmin, isAdminLoading] = useAdmin(user?.email);

   const location = useLocation();

   if (loader || isAdminLoading) {
      return <div>Loading...</div>;
   }

   if (user && isAdmin) {
      return children;
   }

   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;
