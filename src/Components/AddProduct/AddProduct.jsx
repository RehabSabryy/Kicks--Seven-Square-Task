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
  const [loading, setLoading] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  const handleImageChange = (file) => {
    setNewProduct((prevState) => ({
      ...prevState,
      images: [file],
    }));
  };

    //form validation 
    
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Name is required',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Description is required',
    }),
    category_name: Joi.string().required().messages({
      'string.empty': 'Category is required',
    }),
    price: Joi.number().required().messages({
      'string.empty': 'Price is required',
    }),
    images: Joi.array().required().messages({
      'string.empty': 'Image is required',
    }),
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Validate form product
    const { error: validationError } = schema.validate(newProduct, { abortEarly: false });
    if (validationError) {
      console.log("Validation errors:", validationError.details);
      const errors = {};
      validationError.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setError(errors);
      return;
    } else {
      setError({});
    }

      // Check if an image is selected
  if (newProduct.images.length === 0) {
    setError({ images: 'Image is required' });
    return;
  }

    const token = localStorage.getItem('token');
    try {
      // Create product to handle upload image 
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category_name', newProduct.category_name);
      newProduct.images.forEach((image, index) => {
        formData.append('images[]', image);
      });
      const { data } = await axios.post('https://www.sevensquare.net/api/product/createProduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =  'Add New Product failed. Please try again.';
        setError({ general: errorMessage });

    } else  {
        setError({ general: 'Add New Product failed. Please try again.' });
    }
    }
  };

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
                <ProductGallery handleImageChange={handleImageChange}  newProduct={newProduct} />
              </div>
            </div>
            {error && <p className="text-danger">{error.general}</p>}
            <div className="btns row mt-5 ps-4">
              <div className="col-md-2 offset-md-8 space-div" id='addProduct'>
                <Button btn='Add' loading={loading} />
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
