import React from 'react'
import ProductForm from '../Shared/ProductForm'
import ProductGallery from '../Shared/ProductGallery'
import Button from '../Shared/Button'
export default function UpdateProduct() {
  return (
    <div className='p-4'>
          <div className="container rounded-4 p-4 mb-5 bg-white">
              <div className="row" id='addProductInputs'>
                  <div className="col-md-8">
                    <ProductForm />
                  </div>
                  <div className="col-md-4 ps-4 ">
                     <ProductGallery />
                  </div>
              </div>
              <div className="mt-5 ps-4 d-flex justify-content-end">
                          <div  id='addProduct' className='me-2 btns'>
                              <Button btn='Update' />
                          </div>
                          <div className='me-2 delete-color'>
                              <Button btn='Delete'  />
                          </div>
                          <div id='cancelProduct' className='me-2 btns'>
                              <Button btn='Cancel' />
                          </div>
                      </div>
              </div>
    </div>      
  )
}
