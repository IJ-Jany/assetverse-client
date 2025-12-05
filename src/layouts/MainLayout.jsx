import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
         <>
      <Navbar />
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
    );
};

export default MainLayout;