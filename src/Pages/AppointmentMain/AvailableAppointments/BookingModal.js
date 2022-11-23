import { format, formatRelative } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
   console.log('treatment', treatment);
   const { user } = useContext(AuthContext);
   const { name, slots, price } = treatment;
   const date = format(selectedDate, 'PP');
   const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const pName = form.name.value;
      const email = form.email.value;
      const phone = form.phone.value;
      const slots = form.slots.value;

      const appointmentInfo = {
         appointmentDate: date,
         treatment: name,
         patient: pName,
         email,
         phone,
         slots,
         price,
      };
      console.log('appointmentInfo', appointmentInfo);

      fetch('http://localhost:5000/bookings', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
         body: JSON.stringify(appointmentInfo),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.acknowledged) {
               toast.success('booking confirmed');
               refetch();
               setTreatment(null);
            } else {
               toast.error(data.message);
            }
         });

      console.log(appointmentInfo);
   };
   return (
      <>
         <input type="checkbox" id="my-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
               </label>
               <h3 className="text-lg font-bold mb-8">{name}</h3>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                     name="date"
                     type="text"
                     value={date}
                     readOnly
                     placeholder="Type here"
                     className="input input-bordered input-md w-full "
                  />
                  <select name="slots" className="select select-bordered w-full ">
                     {slots.map((slot, i) => (
                        <option key={i} value={slot} slot={slot}>
                           {slot}
                        </option>
                     ))}
                  </select>
                  <input
                     name="name"
                     defaultValue={user?.displayName}
                     type="text"
                     placeholder="Your Name"
                     className="input input-bordered input-md w-full "
                     disabled
                  />
                  <input
                     name="email"
                     type="text"
                     placeholder="Your email"
                     className="input input-bordered input-md w-full "
                     defaultValue={user?.email}
                     disabled
                  />
                  <input
                     name="phone"
                     type="text"
                     placeholder="Your phone"
                     className="input input-bordered input-md w-full "
                  />
                  <input type="submit" className="bg-accent text-white w-full input-md input input-bordered" />
               </form>
            </div>
         </div>
      </>
   );
};

export default BookingModal;
