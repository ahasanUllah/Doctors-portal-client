import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Shared/ConfirmationModal';

const ManageDoctors = () => {
   const [deletingDoctor, setDeletingDoctor] = useState(null);

   const {
      data: doctors,
      isLoading,
      isError,
      refetch,
   } = useQuery(['doctors'], () => {
      return axios(`http://localhost:5000/doctors`, {
         headers: { authorization: `bearer ${localStorage.getItem('accesstoken')}` },
      }).then((data) => {
         const doctors = data.data;

         return doctors;
      });
   });
   if (isLoading) {
      return <h2>Loading ...</h2>;
   }
   if (isError) {
      return <h2>Couldn fetch data</h2>;
   }
   console.log(doctors);

   const handleDelete = (id) => {
      fetch(`http://localhost:5000/doctors/${id}`, {
         method: 'DELETE',
         headers: { authorization: `bearer ${localStorage.getItem('accesstoken')}` },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.deletedCount === 1) {
               toast.success('delete successful');
               refetch();
               setDeletingDoctor(null);
            }
         });
   };

   return (
      <div>
         <div className="overflow-x-auto w-full">
            <table className="table w-full">
               {/* <!-- head --> */}
               <thead>
                  <tr>
                     <th></th>
                     <th>Avatar</th>
                     <th>Name</th>
                     <th>Spacialty</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {/* <!-- row 1 --> */}
                  {doctors.map((doctor, i) => (
                     <tr key={doctor._id}>
                        <th>{i + 1}</th>
                        <td>
                           <div className="flex items-center space-x-3">
                              <div className="avatar">
                                 <div className="mask mask-squircle w-12 h-12">
                                    <img src={doctor.image} alt="Avatar Tailwind CSS Component" />
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td>{doctor.name}</td>
                        <td>{doctor.spaciality}</td>
                        <th>
                           <label
                              className="btn btn-error btn-sm"
                              onClick={() => setDeletingDoctor(doctor)}
                              htmlFor="confirmation-modal"
                           >
                              Delete
                           </label>
                        </th>
                     </tr>
                  ))}

                  {/* <!-- row 2 --> */}
               </tbody>
               {/* <!-- foot --> */}
            </table>
         </div>
         {deletingDoctor && (
            <ConfirmationModal
               setDeletingDoctor={setDeletingDoctor}
               deletingDoctor={deletingDoctor}
               handleDelete={handleDelete}
            ></ConfirmationModal>
         )}
      </div>
   );
};

export default ManageDoctors;
