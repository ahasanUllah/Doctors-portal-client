import DashboardLayout from '../Layout/DashboardLayout';
import AppointmentMain from '../Pages/AppointmentMain/AppointmentMain/AppointmentMain';
import AddDoctors from '../Pages/Dashboard/AddDoctors';
import AllUsers from '../Pages/Dashboard/AllUsers';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ManageDoctors from '../Pages/Dashboard/ManageDoctors';
import MyAppointment from '../Pages/Dashboard/MyAppointment';
import Payment from '../Pages/Dashboard/Payment';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import ErrorPage from '../Pages/Shared/ErrorPage';
import AdminRoutes from './AdminRoutes';
import PrivateRoute from './PrivateRoute';

const { createBrowserRouter } = require('react-router-dom');
const { default: Main } = require('../Layout/Main');
const { default: Home } = require('../Pages/Home/Home/Home');

export const router = createBrowserRouter([
   {
      path: '/',
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
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
            <DashboardLayout>
               <Dashboard></Dashboard>
            </DashboardLayout>
         </PrivateRoute>
      ),
      errorElement: <ErrorPage></ErrorPage>,
      children: [
         {
            path: '/dashboard',
            element: <MyAppointment></MyAppointment>,
         },
         {
            path: '/dashboard/allusers',
            element: (
               <AdminRoutes>
                  <AllUsers></AllUsers>
               </AdminRoutes>
            ),
         },
         {
            path: '/dashboard/adddoctors',
            element: (
               <AdminRoutes>
                  <AddDoctors></AddDoctors>
               </AdminRoutes>
            ),
         },
         {
            path: '/dashboard/managedoctors',
            element: (
               <AdminRoutes>
                  <ManageDoctors></ManageDoctors>
               </AdminRoutes>
            ),
         },
         {
            path: '/dashboard/payment/:id',
            element: (
               <AdminRoutes>
                  <Payment></Payment>
               </AdminRoutes>
            ),
            loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.id}`),
         },
      ],
   },
]);
