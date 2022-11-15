import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOptions from './AppointmentOptions';
import BookingModal from './BookingModal';

const AvailableAppointments = ({ selectedDate }) => {
   const [appointmentOptions, setAppointmentOptions] = useState([]);
   const [treatment, setTreatment] = useState(null);
   useEffect(() => {
      fetch('appointmentOptions.json')
         .then((res) => res.json())
         .then((data) => setAppointmentOptions(data));
   }, []);
   console.log(appointmentOptions);
   return (
      <div className="space-y-12">
         <p className="text-primary text-2xl text-center">Available appoinments on {format(selectedDate, 'PP')} </p>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointmentOptions.map((option) => (
               <AppointmentOptions
                  key={option._id}
                  setTreatment={setTreatment}
                  appointmentOptions={option}
               ></AppointmentOptions>
            ))}
         </div>
         {treatment && (
            <BookingModal selectedDate={selectedDate} setTreatment={setTreatment} treatment={treatment}></BookingModal>
         )}
      </div>
   );
};

export default AvailableAppointments;
