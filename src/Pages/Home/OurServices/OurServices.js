import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import OurService from './OurService';
const OurServices = () => {
   const serviceInfo = [
      {
         id: 1,
         icon: fluoride,
         title: 'fluoride Treatment',
         description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
      },
      {
         id: 2,
         icon: cavity,
         title: 'Cavity Filling',
         description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
      },
      {
         id: 3,
         icon: whitening,
         title: 'Teeth whitening',
         description: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
      },
   ];
   return (
      <div className="py-32">
         <div className="text-center">
            <h2 className="text-primary text-xl font-semibold">Our Services</h2>
            <h1 className="text-3xl">Services we provide</h1>
         </div>
         <div className="grid grid-cols-1 space-y-7 mx-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceInfo.map((service) => (
               <OurService key={service.id} service={service}></OurService>
            ))}
         </div>
      </div>
   );
};

export default OurServices;
