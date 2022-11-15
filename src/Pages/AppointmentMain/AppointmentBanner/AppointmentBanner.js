import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
   return (
      <div>
         <div
            className="hero"
            style={{
               backgroundImage: `url(${bg})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
            }}
         >
            <div className="hero-content flex-col lg:flex-row-reverse">
               <img src={chair} alt="" className="w-[600px]" />
               <div className="mx-16">
                  <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate}></DayPicker>

                  <p> You have picked {format(selectedDate, 'PP')}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AppointmentBanner;
