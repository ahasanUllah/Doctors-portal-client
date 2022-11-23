import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AddDoctors = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const {
      data: spaciality,
      isError,
      isLoading,
   } = useQuery(['spaciality'], () => {
      return axios('http://localhost:5000/doctorsspacialty');
   });
   if (isLoading) {
      return <h2>Loading...</h2>;
   }

   const handleAddDoctor = (data) => {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_API}`, {
         method: 'POST',

         body: formData,
      })
         .then((res) => res.json())
         .then((image) => {
            if (image.success) {
               const doctor = {
                  name: data.name,
                  email: data.email,
                  spaciality: data.spaciality,
                  image: image.data.url,
               };
               fetch(`http://localhost:5000/doctors`, {
                  method: 'POST',
                  headers: {
                     'content-type': 'application/json',

                     authorization: `bearer ${localStorage.getItem('accesstoken')}`,
                  },
                  body: JSON.stringify(doctor),
               })
                  .then((res) => res.json())
                  .then((data) => {
                     console.log(data);
                     toast.success('doctor added');
                  });
            }
         });
   };
   return (
      <div>
         <div className=" ">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
               <h1 className="text-2xl font-bold text-center">Add Doctor</h1>
               <form onSubmit={handleSubmit(handleAddDoctor)} className="space-y-6 ng-untouched ng-pristine ng-valid">
                  <div className="space-y-1 text-sm">
                     <label htmlFor="name" className="block text-gray-600">
                        Name
                     </label>
                     <input
                        type="text"
                        {...register('name', { required: 'Name  required' })}
                        id="name"
                        placeholder="name"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
                     />
                     {errors.name && (
                        <p className="text-red-600" role="alert">
                           {errors.name?.message}
                        </p>
                     )}
                  </div>
                  <div className="space-y-1 text-sm">
                     <label htmlFor="username" className="block text-gray-600">
                        Email
                     </label>
                     <input
                        type="text"
                        {...register('email', {
                           required: 'Email required',
                           pattern: {
                              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Invalid Email',
                           },
                        })}
                        id="email"
                        placeholder="email"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
                     />
                     {errors.email && (
                        <p className="text-red-600" role="alert">
                           {errors.email?.message}
                        </p>
                     )}
                  </div>
                  <div className="space-y-1 text-sm">
                     <label htmlFor="username" className="block text-gray-600">
                        Email
                     </label>
                     <select
                        {...register('spaciality', { required: 'spaciality  required' })}
                        className="select select-bordered w-full "
                     >
                        <option disabled selected>
                           Select a spaciality?
                        </option>
                        {spaciality.data.map((spacial) => (
                           <option key={spacial._id}>{spacial.name}</option>
                        ))}
                     </select>
                  </div>
                  <div className="space-y-1 text-sm">
                     <label htmlFor="name" className="block text-gray-600">
                        Upload your Image
                     </label>
                     <input
                        type="file"
                        {...register('image', { required: 'image  required' })}
                        id="image"
                        placeholder="image"
                        className="w-full px-4 py-3 rounded-md  border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
                     />
                     {errors.image && (
                        <p className="text-red-600" role="alert">
                           {errors.image?.message}
                        </p>
                     )}
                  </div>

                  <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-accent">Add doctor</button>
                  {/* {registerError && <p className="text-red-600">{registerError}</p>} */}
               </form>
               <div className="flex items-center pt-4 space-x-1">
                  <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>

                  <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddDoctors;
