import React from 'react'
import Navbar from '../components/Navbar';
import { ToastContainer} from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Dialog from '../components/Dialog';

function Layout() {
  return (
    <>
      <div className="w-full h-full light ">
        <ToastContainer />
        <Navbar />
        <Dialog />
        <Outlet />
      </div>
    </>
  );
}

export default Layout
