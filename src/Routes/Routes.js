import AppointmentMain from '../Pages/AppointmentMain/AppointmentMain/AppointmentMain';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import PrivateRoute from './PrivateRoute';

const { createBrowserRouter } = require('react-router-dom');
const { default: Main } = require('../Layout/Main');
const { default: Home } = require('../Pages/Home/Home/Home');

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Main></Main>,
      children: [
         {
            path: '/',
            element: <Home></Home>,
         },
         {
            path: '/login',
            element: <Login></Login>,
         },
         {
            path: '/appointment',
            element: <AppointmentMain></AppointmentMain>,
         },
         {
            path: '/register',
            element: <Register></Register>,
         },
      ],
   },
   {
      path: '/dashboard',
      element: (
         <PrivateRoute>
            <Dashboard></Dashboard>
         </PrivateRoute>
      ),
   },
]);
