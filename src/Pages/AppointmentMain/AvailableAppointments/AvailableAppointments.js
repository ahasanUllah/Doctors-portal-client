import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointmentOptions from './AppointmentOptions';
import BookingModal from './BookingModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AvailableAppointments = ({ selectedDate }) => {
   // const [appointmentOptions, setAppointmentOptions] = useState([]);
   const [treatment, setTreatment] = useState(null);
   const date = format(selectedDate, 'PP');

   const {
      data: appointmentOptions,
      isLoading,
      isError,
      refetch,
   } = useQuery(
      ['appointmentOptions', date],
      () => {
         return axios(`http://localhost:5000/appointmentOptions?date=${date}`);
      },
      {
         refetchOnWindowFocus: true,
      }
   );

   if (isLoading) {
      return <h1>Loading...</h1>;
   }
   if (isError) {
      return <h1>Unable to fetch data</h1>;
   }

   // useEffect(() => {
   //    fetch('http://localhost:5000/appointmentOptions')
   //       .then((res) => res.json())
   //       .then((data) => setAppointmentOptions(data));
   // }, []);

   return (
      <div className="space-y-12">
         <p className="text-primary text-2xl text-center">Available appoinments on {format(selectedDate, 'PP')} </p>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointmentOptions.data.map((option) => (
               <AppointmentOptions
                  key={option._id}
                  setTreatment={setTreatment}
                  appointmentOptions={option}
               ></AppointmentOptions>
            ))}
         </div>
         {treatment && (
            <BookingModal
               selectedDate={selectedDate}
               setTreatment={setTreatment}
               treatment={treatment}
               refetch={refetch}
            ></BookingModal>
         )}
      </div>
   );
};

export default AvailableAppointments;
