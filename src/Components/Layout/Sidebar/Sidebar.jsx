import React , { useState,useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import Styles from './Sidebar.module.css'
import { Link } from 'react-router-dom';
import {useProduct} from '../../../Context/ProductContext';

export default function Sidebar() {
    const {categories,fetchProducts,countProductsByCategory} = useProduct();
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchProducts();
    },[])
 
    const goToDashboard = () => {
        navigate('/layout/dashboard');
    }
    const goToAllProducts = () => {
        navigate('/layout/all-products');
    }
  return (
    <>
        <div className='container sidebar-container layout-color full-height '>
            <div className='w-100 text-center'>
                <img src="/Images/Group.png" className='py-5' alt="KICKS" />
            </div>
        <div className='sidebar'>
            <button className='btn btn-link mb-3 pe-5 py-2 text-decoration-none text-black' onClick={goToDashboard}>
            <img src="/Images/dashboaard.png" className='me-1' alt="Dashboard Icon" />
            <span>DASHBOARD</span>
            </button>
            <button className='btn btn-link mb-3  pe-5 py-2 text-decoration-none text-black' onClick={goToAllProducts}>
                <img src="/Images/albums.png" className='me-1' alt="Products Icon" />
                <span>ALL PRODUCTS</span>
            </button>
            <button onClick={goToDashboard} className='btn btn-link mb-3  pe-5 py-2 text-decoration-none text-black'>
                <img src="/Images/document.png" className='me-1' alt="Order Icon" />
                <span>ORDER LIST</span>
            </button>
        </div>
        <div>
            <h5 onClick={() => setIsOpen(!isOpen)}>Categories <i className={`fa-solid ms-5 fa-angle-${isOpen ? 'up' : 'down'}`}></i></h5>
            <div className={`mt-3 ${isOpen ? `${Styles.slideDown}` :`${Styles.slideUp}`}`}>
                {categories.map((category) => (
                    <div key={category}>
                        <Link className='text-decoration-none text-black' to={`/layout/all-products/${category}`}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h6 className='ps-5 pb-3'>{category}</h6>
                            <div className={`bg-color rounded-2 ${Styles.categoryNumbers}`}>
                                <span className='p-2'>{countProductsByCategory(category)}</span>
                            </div>
                        </div>    
                        </Link>
                    </div>
                ))}
            </div>
        </div>        
        </div>
    </>
  )
}
