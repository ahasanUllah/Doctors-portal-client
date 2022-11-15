import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const AppointmentMain = () => {
   const [selectedDate, setSelectedDate] = useState(new Date());
   return (
      <div className="space-y-36">
         <AppointmentBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate}></AppointmentBanner>
         <AvailableAppointments selectedDate={selectedDate}></AvailableAppointments>
      </div>
   );
};

export default AppointmentMain;
