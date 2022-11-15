import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const Dashboard = () => {
   const { user } = useContext(AuthContext);

   return (
      <div>
         <h2>Comming Soon</h2>
         <p>{user.email}</p>
      </div>
   );
};

export default Dashboard;
