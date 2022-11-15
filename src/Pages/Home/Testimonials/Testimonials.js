import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Testimonial from './Testimonial';

const Testimonials = () => {
   const reviewInfo = [
      {
         rev: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
         id: 1,
         name: 'Winston Herry',
         location: 'california',
         image: people1,
      },
      {
         rev: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
         id: 2,
         name: 'Winston Herry',
         location: 'california',
         image: people2,
      },
      {
         rev: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content',
         id: 3,
         name: 'Winston Herry',
         location: 'california',
         image: people3,
      },
   ];
   return (
      <div className="my-20 px-7">
         <div className="flex justify-between items-center">
            <div>
               <h4 className="font-bold text-primary"> Testimonials</h4>
               <h2 className="text-3xl ">What Our Patients Says</h2>
            </div>
            <div>
               <img src={quote} alt="" className="w-24 lg:w-48" />
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {reviewInfo.map((review) => (
               <Testimonial key={review.id} review={review}></Testimonial>
            ))}
         </div>
      </div>
   );
};

export default Testimonials;
