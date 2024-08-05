import React, { useState } from 'react';
import Styles from './AddProduct.module.css';
import Button from '../Shared/Button';
import ProductForm from '../Shared/ProductForm';
import ProductGallery from '../Shared/ProductGallery';
import axios from 'axios';
import Joi from 'joi';

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category_name: '',
    images: [],
  });
  const [error, setError] = useState({});

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const handleImageChange = (file) => {
    setNewProduct({ ...newProduct, images: [file] });
  };


  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Validate form product
    const { error: validationError } = schema.validate(newProduct, { abortEarly: false });
    if (validationError) {
      const errors = {};
      validationError.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setError(errors);
      return;
    } else {
      setError({});
    }

    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post('https://www.sevensquare.net/api/product/createProduct', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product created successfully:', data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Name is required',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Description is required',
    }),
    price: Joi.string().required().messages({
      'string.empty': 'Price is required',
    }),
    category_name: Joi.string().required().messages({
      'string.empty': 'Category is required',
    }),
    price : Joi.string().required().messages({
      'string.empty': 'Price is required',
    }),
  });

  return (
    <>
      <div className='ps-4 pt-4'>
        <h4 className='fw-bold'>Product Details</h4>
        <p className={Styles.productParaghragh}>Home &gt; Products &gt; Add New Product</p>
      </div>
      <div className='p-4'>
        <div className="container rounded-4 p-4 mb-5 bg-white">
          <form onSubmit={handleAddProduct}>
            <div className="row" id='addProductInputs'>
              <div className="col-md-8">
                <ProductForm handleChanges={handleChanges} newProduct={newProduct} error={error} />
              </div>
              <div className="col-md-4 ps-4 ">
                <ProductGallery handleChanges={handleImageChange} newProduct={newProduct} />
              </div>
            </div>
            <div className="btns row mt-5 ps-4">
              <div className="col-md-2 offset-md-8" id='addProduct'>
                <Button btn='Add' />
              </div>
              <div className="col-md-2" id='cancelProduct'>
                <Button btn='Cancel' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
