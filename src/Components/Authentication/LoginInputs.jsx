import React ,{useState}from 'react'
import Joi from 'joi'
export default function LoginInputs({handleChanges, error,form}) {
 
  return (
    <>
        <div className="form-group my-4">
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Email" value={form.email} onChange={handleChanges}/>
            {error && error.email && <p className='text-danger mt-1'>{error.email}</p>}
        </div>
        <div className="form-group mb-1">
            <input type="password" className="form-control" id="password" name="password" placeholder='Password' value={form.password} onChange={handleChanges}/>
            {error && error.password && <p className='text-danger mt-1'>{error.password}</p>}
            {/* display general error messages */}
            {error && error.general && <p className='text-danger mt-1'>{error.general}</p>}
        </div>
    </>
  )
}
