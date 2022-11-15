import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
   const { login } = useContext(AuthContext);
   const [loginError, setLoginError] = useState('');
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const handleLogin = (data) => {
      console.log(data);
      login(data.email, data.password)
         .then((result) => {
            const user = result.user;
            toast.success('login successfull');
            navigate(from, { replace: true });
            console.log(user);
         })
         .catch((error) => {
            console.log(error);
            setLoginError(error.message);
         });
   };

   return (
      <div className="h-[800px] flex justify-center items-center">
         <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 ng-untouched ng-pristine ng-valid">
               <div className="space-y-1 text-sm">
                  <label for="email" className="block text-gray-600">
                     Email
                  </label>
                  <input
                     type="text"
                     {...register('email', { required: 'Email address is required' })}
                     id="email"
                     placeholder="Email"
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
                        required: 'password is required',
                        minLength: { value: 6, message: 'password is 6 charecters or longer' },
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
               <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-accent">Sign in</button>
               {loginError && <p className="text-red-600">{loginError.slice(10)}</p>}
            </form>
            <div className="flex items-center pt-4 space-x-1">
               <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
               <p className="px-3 text-sm text-gray-600">Or</p>
               <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
               <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
            </div>
            <p className="text-xs text-center sm:px-6 text-gray-600">
               Don't have an account?
               <Link rel="noopener noreferrer" to="/register" className="underline text-gray-800">
                  Register
               </Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
