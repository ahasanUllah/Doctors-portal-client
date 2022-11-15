import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Hearder from '../Pages/Shared/Hearder';

const Main = () => {
   return (
      <div>
         <Hearder></Hearder>
         <Outlet></Outlet>
         <Footer></Footer>
      </div>
   );
};

export default Main;
