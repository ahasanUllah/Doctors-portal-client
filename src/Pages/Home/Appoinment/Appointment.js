import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import doctor from '../../../assets/images/doctor.png';
import PrimaryButton from '../../../components/PrimaryButton';
const Appointment = () => {
   return (
      <section
         className="my-8"
         style={{
            background: `url(${appointment})`,
         }}
      >
         <div className="hero  ">
            <div className="hero-content flex-col lg:flex-row">
               <img src={doctor} className="-mt-32 lg:w-1/2 rounded-lg shadow-2xl hidden lg:block" />
               <div>
                  <h2 className="text-primary font-semibold">Appointment</h2>
                  <h1 className="text-3xl font-semibold text-white">Make an appointment Today</h1>
                  <p className="py-6 text-md text-white">
                     It is a long established fact that a reader will be distracted by the readable content of a page
                     when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal
                     distribution of letters,as opposed to using 'Content here, content here', making it look like
                     readable English. Many desktop publishing packages and web page
                  </p>
                  <PrimaryButton>Appointment</PrimaryButton>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Appointment;
