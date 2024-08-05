import React , { useEffect, useState } from 'react'
import ProductForm from '../Shared/ProductForm'
import ProductGallery from '../Shared/ProductGallery'
import Button from '../Shared/Button'
import axios from 'axios' 
import { useParams, useNavigate } from 'react-router'
import Loading from '../Loading/Loading'
export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`https://www.sevensquare.net/api/product/getProductDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(data.data);

    } catch (error) {
      setError(error.response.data.message);
    }
    finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (file) => {
    setProduct({ ...product, images: [URL.createObjectURL(file)] });  // Store URL for preview
  };

  
  return (
    <>
    <div className='ps-4 pt-4'>
        <h4 className='fw-bold'>Update Product </h4>
        <p className='fw-semibold'>Home &gt; Products</p>
      </div>
    <div className='p-4'>
     {product ? (
        <div className="container rounded-4 p-4 mb-5 bg-white">
        <div className="row" id='addProductInputs'>
            <div className="col-md-8">
              <ProductForm handleChanges={handleChanges} newProduct={product} error={error}/>
            </div>
            <div className="col-md-4 ps-4 ">
               <ProductGallery  handleImageChange={handleImageChange} newProduct={product}/>
            </div>
        </div>
        <div className="mt-5 ps-4 d-flex justify-content-end">
                    <div  id='addProduct' className='me-2 btns'>
                        <Button btn='Update' />
                    </div>
                    <div className='me-2 delete-color' data-bs-toggle="modal" data-bs-target="#exampleModal" >
                        <Button btn='Delete' />
                    </div>
                    <div id='cancelProduct' className='me-2 btns'>
                        <Button btn='Cancel' />
                    </div>
                </div>
             
                {/* show modal */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog h-100 d-flex flex-column justify-content-center">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Are you sure you want to delete this product?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn close-btn" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn delete-btn">Delete</button>
                        </div>
                      </div>
                    </div>
              </div>
        </div>
     ) : (
            <div className='d-flex justify-content-center align-items-center mt-5 pt-5'>
              <Loading />
            </div>
        )
     }     
    </div>  
    </>    
  )
}
