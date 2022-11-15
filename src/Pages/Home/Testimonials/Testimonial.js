import React from 'react';

const Testimonial = ({ review }) => {
   const { rev, name, image, location } = review;
   return (
      <div>
         <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
               <p className="text-base">{rev}</p>
               <div className="card-actions justify-start py-7">
                  <img src={image} className="w-16 rounded-full ring ring-primary" alt="" />
                  <div>
                     <h2 className="text-black font-semibold text-lg">{name}</h2>
                     <p className="text-sm">{location}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Testimonial;
