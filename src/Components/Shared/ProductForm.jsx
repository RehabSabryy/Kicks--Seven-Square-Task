import React, { useState } from 'react'
export default function ProductForm({handleChanges, newProduct, error}) {

   const [tagInput, setTagInput] = useState('');
   const [tags, setTags] = useState([]);

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagClick = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <>
        <div className='mb-3'>
            <label className='fw-bold mb-3' htmlFor="name">Product Name</label>
            <input type="text" name="name" className="form-control" id="name" placeholder='Type name here' value={newProduct.name} onChange={handleChanges}/>
            {error && error.name && <p className='text-danger mt-1'>{error.name}</p>}
        </div>  
        <div className='mb-3'>
            <label className='fw-bold mb-3' htmlFor="description">Description</label>
            <textarea name="description" id="description" className="form-control" placeholder='Type Description here' rows={7} value={newProduct.description} onChange={handleChanges}></textarea>
            {error && error.description && <p className='text-danger mt-1'>{error.description}</p>}

        </div> 
        <div className='mb-3'>
            <label className='fw-bold mb-3' htmlFor="category">Category</label>
            <input type="text" name="category_name" className="form-control" id="category" placeholder='Type Category here' value={newProduct.category_name} onChange={handleChanges} />
            {error && error.category_name && <p className='text-danger mt-1'>{error.category_name}</p>}
        </div> 
        <div className='mb-3'>
            <label className='fw-bold mb-3' htmlFor="brand">Brand Name</label> 
            <input type="text" name="brand" className="form-control" id="brand" placeholder='Type Brand Name here' />
        </div>  
        <div className='row mb-3'>
            <div className='col-md-6'>
                <label className='fw-bold mb-3' htmlFor="sku">SKU</label>
                <input type="text" name="sku" className="form-control" id="sku" placeholder='Fox-3983' />
            </div> 
            <div className='col-md-6'>
                <label className='fw-bold mb-3' htmlFor="stock">Stock Quantity</label>  
                <input type="text" name="stock" className="form-control" id="stock" placeholder='1258' />
            </div>    
        </div>
        <div className="row mb-3">
            <div className='col-md-6'>
                <label className='fw-bold mb-3' htmlFor="regular-price">Regular Price</label>
                <input type="text" name="regular-price" className="form-control" id="regular-price" placeholder='$1000'/>
                {error && error.price && <p className='text-danger mt-1'>{error.price}</p>}
            </div>
            <div className='col-md-6'>
                <label className='fw-bold mb-3' htmlFor="sale-price">Sale Price</label>
                <input type="text" name="sale-price" className="form-control" id="sale-price" placeholder='$450' />
            </div>
        </div>
      <div className='mb-3'>
          <label htmlFor="tag" className='fw-bold mb-3' >Tag</label>
          <div className='position-relative'>
          <div className="p-2 d-flex flex-wrap gap-2 border border-black rounded" >
            {tags.map((tag, index) => (
              <span key={index} className="badge tag-color py-2 px-3">{tag}</span>
            ))}
            <input type="text" name="tag" className="form-control border-0" placeholder='Type tag here and press enter'
              value={tagInput} onChange={handleTagChange} onKeyDown={handleTagKeyDown} />
          </div>
        </div>
      </div>
    </>
  )
}
