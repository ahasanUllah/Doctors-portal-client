import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';

const Register = () => {
   const { createUser, updateUser } = useContext(AuthContext);
   const [registerError, setRegisterError] = useState('');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const handleRegister = (data) => {
      setRegisterError('');
      console.log(data);
      createUser(data.email, data.password)
         .then((result) => {
            const user = result.user;
            updateUser(data.name)
               .then(() => {
                  console.log('profile updated');
                  toast.success('register success');
               })
               .catch((error) => console.log(error));

            console.log(user);
         })
         .catch((error) => {
            console.log(error);
            setRegisterError(error.message);
         });
   };

   return (
      <div className="h-[800px] flex justify-center items-center">
         <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6 ng-untouched ng-pristine ng-valid">
               <div className="space-y-1 text-sm">
                  <label for="name" className="block text-gray-600">
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
                  <label for="username" className="block text-gray-600">
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
                  <label for="password" className="block text-gray-600">
                     Password
                  </label>
                  <input
                     type="password"
                     {...register('password', {
                        required: 'Password required',
                        minLength: { value: 6, message: 'password must be at least 6 charachter' },
                        pattern: {
                           value: /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{6,96}$/gmu,
                           message: 'password must be strong',
                        },
                     })}
                     id="password"
                     placeholder="Password"
                     className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
                  />
                  {errors.password && (
                     <p className="text-red-600" role="alert">
                        {errors.password?.message}
                     </p>
                  )}
                  <div className="flex justify-end text-xs text-gray-600">
                     <a rel="noopener noreferrer" href="/">
                        Forgot Password?
                     </a>
                  </div>
               </div>
               <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-accent">Register</button>
               {registerError && <p className="text-red-600">{registerError}</p>}
            </form>
            <div className="flex items-center pt-4 space-x-1">
               <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
               <p className="px-3 text-sm text-gray-600">OR</p>
               <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
               <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>
            <p className="text-xs text-center sm:px-6 text-gray-600">
               Already have an account?
               <Link rel="noopener noreferrer" to="/login" className="underline text-gray-800">
                  Login
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Register;
