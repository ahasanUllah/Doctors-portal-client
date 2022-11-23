import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = ({ booking }) => {
   const [cardError, setCardError] = useState('');
   const [success, setSuccess] = useState('');
   const [transactionId, setTransactionId] = useState('');
   const [processing, setprocessing] = useState(false);
   const [clientSecret, setClientSecret] = useState('');
   const stripe = useStripe();
   const elements = useElements();
   const { price, patient, email, _id } = booking;

   useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch('http://localhost:5000/create-payment-intent', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ price }),
      })
         .then((res) => res.json())
         .then((data) => setClientSecret(data.clientSecret));
   }, [price]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);

      if (card == null) {
         return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card,
      });
      if (error) {
         setCardError(error.message);
      } else {
         setCardError('');
         console.log('[PaymentMethod]', paymentMethod);
      }
      setSuccess('');
      setprocessing(true);
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               name: patient,
               email: email,
            },
         },
      });
      if (confirmError) {
         setCardError(confirmError.message);
         setprocessing(false);
         return;
      }
      if (paymentIntent.status === 'succeeded') {
         const paymentInfo = {
            price,
            name: patient,
            email: email,
            transactionId: paymentIntent.id,
            bookingId: _id,
         };
         fetch(`http://localhost:5000/payment`, {
            method: 'POST',
            headers: {
               'content-type': 'application/json',
               authorization: `bearer ${localStorage.getItem('accesstoken')}`,
            },
            body: JSON.stringify(paymentInfo),
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               if (data.acknowledged) {
                  setSuccess('Congrats successful payment');
                  setTransactionId(paymentIntent.id);
                  setprocessing(false);
               }
            });
      }
      console.log('paymentIntent', paymentIntent);
   };

   return (
      <div>
         <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
               className="border border-gray-400 w-96"
               options={{
                  style: {
                     base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
            <p className="text-red-500">{cardError}</p>
            {success && (
               <div>
                  <p className="mb-4 text-green-600">{success}</p>
                  <p>Transaction id: {transactionId}</p>
               </div>
            )}
            <button className="btn btn-primary btn-sm" type="submit" disabled={!stripe || !clientSecret || processing}>
               Pay
            </button>
         </form>
      </div>
   );
};

export default Checkout;
