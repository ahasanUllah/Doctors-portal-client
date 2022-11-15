import React from 'react';
import { GoLocation } from 'react-icons/go';

const InfoCard = ({ card }) => {
   const { title, icon, description, bgClass } = card;
   return (
      <div>
         <div className="">
            <div className={`card lg:min-w-[450px] py-5 ${bgClass} text-white px-5`}>
               <div className="card-body items-center text-center flex flex-col lg:flex-row">
                  <img src={icon} className="w-20 h-20" alt="" />
                  <div>
                     <h2 className="card-title">{title}</h2>
                     <p>{description}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default InfoCard;
