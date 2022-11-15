import React from 'react';

const AppointmentOptions = ({ appointmentOptions, setTreatment }) => {
   const { name, slots } = appointmentOptions;
   return (
      <div>
         <div className="card   shadow-xl">
            <div className="card-body text-center">
               <h2 className="text-xl font-semibold text-primary text-center">{name}</h2>
               <p>
                  {slots.length ? `${slots[0].slice(0, 8)} -  ${slots[slots.length - 1].slice(-7)}` : 'Try another day'}
               </p>
               <p>
                  {slots.length} {slots.length > 1 ? 'spaces' : 'space'} availabe
               </p>
               <div className="card-actions justify-center">
                  <label
                     disabled={slots.length === 0}
                     htmlFor="my-modal"
                     onClick={() => setTreatment(appointmentOptions)}
                     className="btn btn-primary text-white"
                  >
                     Book Appointment
                  </label>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AppointmentOptions;
