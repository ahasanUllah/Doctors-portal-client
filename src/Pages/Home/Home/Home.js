import React from 'react';
import Appointment from '../Appoinment/Appointment';
import Banner from '../Banner/Banner';
import InfoCard from '../InfoCard/InfoCard';
import InfoCards from '../InfoCard/InfoCards';
import OurServices from '../OurServices/OurServices';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
   return (
      <div>
         <Banner></Banner>
         <InfoCards></InfoCards>
         <OurServices></OurServices>
         <Appointment></Appointment>
         <Testimonials></Testimonials>
      </div>
   );
};

export default Home;
