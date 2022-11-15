import React from 'react';

const OurService = ({ service }) => {
   const { title, icon, description } = service;
   return (
      <div>
         <div className="card  bg-base-100 shadow-xl ">
            <div className="card-body items-center">
               <img src={icon} className="w-24 h-28" alt="" />
               <h2 className="card-title text-center">{title}</h2>
               <p className="text-center">{description}</p>
               <div className="card-actions justify-end"></div>
            </div>
         </div>
      </div>
   );
};

export default OurService;
