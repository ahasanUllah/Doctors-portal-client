import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';

const stripePromise = loadStripe(
   'pk_test_51M6BfHFBxDLpqAGVa5iUYOEOegoKYHVxRoLgMNPJO5cbVZR4rzzXkpCU0xooG5cH0cLjvissZO8FPcpIZest5GNM00xwJIJFTf'
);
const Payment = () => {
   const booking = useLoaderData();
   console.log(booking);

   return (
      <div>
         <div>
            <h2>Payment </h2>
         </div>
         <Elements stripe={stripePromise}>
            <Checkout booking={booking}></Checkout>
         </Elements>
      </div>
   );
};

export default Payment;
