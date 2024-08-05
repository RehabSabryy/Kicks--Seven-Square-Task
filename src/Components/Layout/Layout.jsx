import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import {  Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
export default function Layout() {
  return (
    <>
        <div className="container-fluid row m-0 p-0 min-height-available">
            <div className="col-md-2 p-0 position-fixed sidebar-border">
                <Sidebar />
            </div>
            <div className="col-md-10 offset-md-2 fixed-top p-0">
                <Navbar />
            </div>
            <div className='bg-color col-md-10 offset-md-2 position-relative mt-5 pt-5 '>
                <Outlet></Outlet>
            </div>
            <div className='col-md-10 offset-md-2 bg-color bottom-0'>
                <Footer />
            </div>
        </div>
    </>
  )
}
