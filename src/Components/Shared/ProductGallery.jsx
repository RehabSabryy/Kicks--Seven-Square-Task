import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Styles from './../AddProduct/AddProduct.module.css';

export default function ProductGallery({ handleImageChange, newProduct }) {
  const [productImg, setProductImg] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProductImg(file);
    handleImageChange(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });
  // when new product image uploaded replace the product default image
  useEffect(() => {
    if (newProduct.images && newProduct.images.length > 0) {
      setProductImg(newProduct.images[0]);
    }
  }, [newProduct.images]);
  return (
    <>
      {productImg ? (
        <img src={URL.createObjectURL(productImg)} className='w-100' alt="new product" />
      ) : (
        <img src="/Images/uploadedImgDefault.png" className='w-100' alt="new product" />
      )}
      <div className='mt-4'>
        <p className='fw-bold'>Product Gallery</p>
        <div
          {...getRootProps()}
          className={`text-center p-3 ${Styles.draggable}`}
          style={{ border: '2px dashed #ddd', cursor: 'pointer' }}
        >
          <input {...getInputProps()} />
              <img src="/Images/draggable.png" alt="Drag Image" />
              <p>Drop your image here, or browse</p>
              <p>Jpeg, png are allowed</p>
        </div>
      </div>
    </>
  );
}
