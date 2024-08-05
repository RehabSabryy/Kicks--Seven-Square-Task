import React from 'react'
import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/layout/dashboard');
  }
  return (
    <>
    <div className='full-height d-flex flex-column justify-content-center align-items-center layout-color'>
      <h1 className='fw-bold text-muted'>404</h1>
      <h2 className='fw-bold text-muted'>Page Not Found</h2>
      <button className='btn btn-dark mt-3 px-5 py-2' onClick={handleHome} >Home</button>
    </div>
    </>
  )
}
