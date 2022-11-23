import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
   const {
      data: users,
      isLoading,
      isError,
      refetch,
   } = useQuery(['users'], () => {
      return axios('http://localhost:5000/users');
   });
   if (isLoading) {
      return (
         <div>
            <h2>Loading...</h2>
         </div>
      );
   }
   if (isError) {
      return (
         <div>
            <h2>Cannot fetch data</h2>
         </div>
      );
   }
   const handleMakeAdmin = (id) => {
      fetch(`http://localhost:5000/users/admin/${id}`, {
         method: 'PUT',
         headers: { authorization: `bearer ${localStorage.getItem('accesstoken')}` },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
               toast.success('Permission given');
               refetch();
            }
         });
   };

   return (
      <div>
         <h2>All users</h2>
         <div className="overflow-x-auto">
            <table className="table w-full">
               {/* <!-- head --> */}
               <thead>
                  <tr>
                     <th></th>
                     <th>Name</th>
                     <th>email</th>
                     <th>Admin</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {/* <!-- row 1 --> */}
                  {users.data.map((user, i) => (
                     <tr key={user._id}>
                        <th>{i + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                           {user.role !== 'admin' && (
                              <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-primary btn-xs">
                                 Make Admin
                              </button>
                           )}
                        </td>
                        <td>
                           <button className="btn btn-accent btn-xs">Delete</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllUsers;
