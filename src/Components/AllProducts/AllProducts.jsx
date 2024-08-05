import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { useProduct } from '../../Context/ProductContext';
import './AllProducts.css';
export default function AllProducts() {
  const {fetchProducts,allProducts} = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const {category} = useParams('');
  
  useEffect(()=>{
   fetchProducts(currentPage);
  },[currentPage]);
  const goToAddProduct = () => {
    navigate('/layout/add-product')
  }

  // function to change the string to array of words then get the first 5 words
  const truncateDescription = (description, wordLimit = 5) => {
    // Split the description into an array of words
    const words = description.split(' ');
    // Get the first 5 words
    const truncatedWords = words.slice(0, wordLimit);
    // Join the words back into a string
    return truncatedWords.join(' ') + (words.length > wordLimit ? '...' : '');
  };

    // Filter products based on category
    const filteredProducts = category ? allProducts.filter(product => product.product_categories.includes(category)) : allProducts;


     // Pagination
  const totalPages = 10; 
  const pageList = new Array(totalPages).fill(null).map((_, index) => index + 1);
  const onPaginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <div className="container">
      <div className='d-flex justify-content-between align-items-center p-4'>
        <div>
          <h4>Category : {category || 'All Products'} </h4>
          <p className='fw-semibold'>Home &gt; All Products</p>
        </div>
        <div className='btns'>
          <button className='btn' onClick={goToAddProduct}><img src="/Images/Add_circle.png" alt="Add Product" /> Add New Product</button>
        </div>
      </div>
      <div className='row'>
      {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
         <div className="col-md-4 p-3 mb-4" key={product.id}>
         <Link className='text-decoration-none text-black' to={`/layout/update-product/${product.id}`}>
          <div className="box-color p-3  rounded-4">
         <div className='d-flex justify-content-between '>
         <div>
          {product.images && product.images.length > 0 ? (
              <img src={product.images[0] }  className={`productImg rounded-3 me-3`} alt="Products" />

            ) : (
            <img src='/Images/product-default.png' className={`productImg rounded-3 me-3`} alt="Products" />
          )} 
         </div>
           <div>
             <h5>{product.product_name}</h5>
             <p className='text-muted'>{product.product_categories}</p>
             <p className='fw-bold'>{product.price}</p>
           </div>
           <div>
             <img src="/Images/dots.png" className='cursor-pointer' alt="dots" />
           </div>
         </div>
         <div>
           <h6>Summary</h6>
           <p className='text-muted'>{truncateDescription(product.description)}</p>
         </div>
         <div className='border  border-dark-subtle p-3 rounded-3'>
           <div className='d-flex justify-content-between'>
             <p>Sales</p>
             <div className='d-flex align-items-baseline'>
             <i className="fa-solid fa-arrow-up icon-color pe-2"></i>
             <p>1269</p>
             </div>
           </div>
           <hr />
           <div className='d-flex justify-content-between'>
             <p>Remaining Products</p>
             <div className='d-flex align-items-baseline'>
              <img src="/Images/bar.png" className='pe-2' alt="Remaining" />
             <p>1269</p>
             </div>
           </div>
         </div>
       </div>
       </Link>
       </div>
          ))      
        ) : (
          <div className='text-center my-5 py-5'>
             <Loading />
          </div>
        )}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pageList.map((page) => (
              <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page} onClick={() => onPaginate(page)}>
                <a className="page-link">{page}</a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => onPaginate(currentPage + 1)}>
              <a className="page-link">Next <i className="fa-solid fa-angle-right"></i></a>
            </li>
          </ul>
        </nav>
    </div>
    </>
  )
}
