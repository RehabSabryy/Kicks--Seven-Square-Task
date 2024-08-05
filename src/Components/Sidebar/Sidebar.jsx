import React from 'react'
import { useNavigate } from 'react-router'
export default function Sidebar() {
    const navigate = useNavigate();
    const goToDashboard = () => {
        navigate('/layout/dashboard');
    }
    const goToAllProducts = () => {
        navigate('/layout/all-products');
    }
  return (
    <>
        <div className='container layout-color full-height '>
            <div className='w-100 text-center'>
                <img src="/Images/Group.png" className='py-5' alt="KICKS" />
            </div>
        <div>
            <button className='btn btn-link mb-3 text-decoration-none text-black' onClick={goToDashboard}>
            <img src="/Images/dashboaard.png" className='me-1' alt="Dashboard Icon" />
            <span>DASHBOARD</span>
            </button>
            <button className='btn btn-link mb-3 text-decoration-none text-black' onClick={goToAllProducts}>
                <img src="/Images/albums.png" className='me-1' alt="Products Icon" />
                <span>ALL PRODUCTS</span>
            </button>
            <button className='btn btn-link mb-3 text-decoration-none text-black'>
                <img src="/Images/document.png" className='me-1' alt="Order Icon" />
                <span>ORDER LIST</span>
            </button>
        </div>
        <div>
            <h5>Categories <i className="fa-solid fa-angle-down ms-5"></i></h5>
        </div>
        </div>
    </>
  )
}
