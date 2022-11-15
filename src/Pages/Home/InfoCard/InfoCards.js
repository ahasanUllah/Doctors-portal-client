import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
   const cardInfo = [
      {
         id: 1,
         title: 'Opening Hours',
         description: '9am to 5pm everyday',
         icon: clock,
         bgClass: 'bg-gradient-to-r from-primary to-secondary',
      },
      {
         id: 2,
         title: 'Contact us now',
         description: '+000 123 3443456',
         icon: phone,
         bgClass: 'bg-accent',
      },
      {
         id: 3,
         title: 'Visit our loacation',
         description: 'Brooklyn, NY 10036, United States',
         icon: marker,
         bgClass: 'bg-gradient-to-r from-primary to-secondary',
      },
   ];

   return (
      <div className="grid grid-cols-1 gap-5 mx-3 md:grid-cols-2 lg:grid-cols-3 ">
         {cardInfo.map((card) => (
            <InfoCard key={card.id} card={card}></InfoCard>
         ))}
      </div>
   );
};

export default InfoCards;
