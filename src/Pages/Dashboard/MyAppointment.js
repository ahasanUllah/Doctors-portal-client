import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const MyAppointment = () => {
   const { user } = useContext(AuthContext);

   const {
      data: bookings,
      isLoading,
      isError,
   } = useQuery(['bookings', user?.email], () => {
      return axios(`http://localhost:5000/bookings?email=${user?.email}`, {
         headers: { authorization: `bearer ${localStorage.getItem('accesstoken')}` },
      });
   });
   if (isLoading) {
      return <h1 className="text-4xl">Loading...</h1>;
   }
   if (isError) {
      return <h1 className="text-2xl"> Can't fetch data</h1>;
   }

   console.log(bookings.data);
   return (
      <div className="space-y-10">
         <div>
            <h2 className="text-2xl font-semibold">My Appointment</h2>
         </div>
         <div>
            <div className="overflow-x-auto">
               <table className="table w-full">
                  {/* <!-- head --> */}
                  <thead>
                     <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Price</th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* <!-- row 1 --> */}
                     {bookings.data.map((booking, i) => (
                        <tr key={booking._id}>
                           <th>{i}</th>
                           <td>{booking.patient}</td>
                           <td>{booking.treatment}</td>
                           <td>{booking.appointmentDate}</td>
                           {booking.price && !booking.paid && (
                              <td>
                                 <Link to={`/dashboard/payment/${booking._id}`}>
                                    <button className="btn btn-primary">pay</button>
                                 </Link>
                              </td>
                           )}
                           {booking.paid && (
                              <td>
                                 <p className="text-green-600 font-semibold">paid</p>
                              </td>
                           )}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default MyAppointment;
