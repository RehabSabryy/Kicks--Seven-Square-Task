import React, { useEffect, useState } from 'react'
import Styles from './AllProducts.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router';
export default function AllProducts() {
  const [allProducts,setAllProducts] = useState([]);
  const [error,setError] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
   fetchAllProducts();
  },[])

  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const {data} = await axios.get('https://www.sevensquare.net/api/product/getAllProducts?page=&per_page=&filters=',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      setAllProducts(data.data);

    }
    catch (error) {
      console.log(error);
      setError(error.response.data.message);
      
    }
  }
  const goToAddProduct = () => {
    navigate('/layout/add-product')
  }
  return (
    <>
    <div className="container">
      <div className='d-flex justify-content-between align-items-center p-4'>
        <div>
          <h4>Category : Sneakers</h4>
          <p>Home &gt; All Products</p>
        </div>
        <div className='btns'>
          <button className='btn' onClick={goToAddProduct}><img src="/Images/Add_circle.png" alt="Add Product" /> Add New Product</button>
        </div>
      </div>
      <div className='row'>
      {allProducts.length > 0 ? (
          allProducts.map((product) => (
         <div className="col-md-4 p-3" key={product.id}>
          <div className="box-color p-3  rounded-4">
         <div className='d-flex justify-content-between '>
         <div>
          {product.images && product.images.length > 0 ? (
              <img src={product.images[0] }  className={`${Styles.productImg} rounded-3 me-3`} alt="Products" />

            ) : (
            <img src='/Images/product-default.png' className={`${Styles.productImg} rounded-3 me-3`} alt="Products" />
          )} 
         </div>
           <div>
             <h5>{product.product_name}</h5>
             <p className='text-muted'>{product.product_categories}</p>
             <p className='fw-bold'>{product.price}</p>
           </div>
           <div>
             <img src="/Images/dots.png" alt="dots" />
           </div>
         </div>
         <div>
           <h6>Summary</h6>
           <p className='text-muted'>{product.description}</p>
         </div>
         <div className='border  border-dark-subtle p-3 rounded-3'>
           <div className='d-flex justify-content-between'>
             <p>Sales</p>
             <div className='d-flex align-items-baseline'>
             <i className="fa-solid fa-arrow-up icon-color pe-2"></i>
             <p>{product.average_rating}</p>
             </div>
           </div>
           <hr />
           <div className='d-flex justify-content-between'>
             <p>Remaining Products</p>
             <div className='d-flex align-items-baseline'>
              <img src="/Images/bar.png" alt="Remaining" />
             <p>{product.average_rating}</p>
             </div>
           </div>
         </div>
       </div>
       </div>
          ))
        
        ) : (
          <p>No products found</p>
        )}
        </div>
      
    </div>
    </>
  )
}
