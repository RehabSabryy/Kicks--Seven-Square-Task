import React, { useState } from 'react';
import LoginInputs from '../LoginInputs';
import AuthButton from '../AuthButton';
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Loading from 'react-loading';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // validate form
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required().messages({
      'string.min': 'First name must be at least 3 characters long',
      'string.max': 'First name must be at most 20 characters long',
      'any.required': 'First name is required',
      'string.empty': 'First name is required',
    }),
    lastName: Joi.string().min(3).max(20).required().messages({
      'string.min': 'Last name must be at least 3 characters long',
      'string.max': 'Last name must be at most 20 characters long',
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required',
    }),
    email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'edu', 'gov'] } }).required().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      
    }),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')).required().messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and special character and at least 8 characters long',
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
    }),
  });

  //input active changes
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // submit form action
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate form 
    const { error } = schema.validate(form, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setError(errors);
      return;
    } else {
      setError({});
    }

    const { firstName, lastName, email, password } = form;
    const name= `${firstName} ${lastName}`;
    try {
      setLoading(true);
      const { data } = await axios.post('https://www.sevensquare.net/api/user/register', { name, email, password });
      console.log(data);
      setLoading(false);
      navigate('/')
    }
     catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setError({ general: 'Registration failed. Please try again.' });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid row">
        <div className="col-md-5 p-0">
          <img src="/Images/auth.png" className="full-height auth-img w-100" alt="kicks" />
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-center">
          <div className="container px-5 w-75 m-auto auth-container">
            <h1>Register</h1>
            <h5 className='fw-bold pt-3'>Your Name</h5>
            <form id="registerForm" onSubmit={handleSubmit}>
              <div className="form-group my-4">
                <input type="text" className="form-control" id="firstName" name="firstName" aria-describedby="nameHelp" placeholder="First Name" onChange={handleChanges} />
                {error && error.firstName && <p className='text-danger mt-1'>{error.firstName}</p>}
              </div>
              <div className='form-group mb-4'>
                <input type="text" className="form-control" id="lastName" name="lastName" aria-describedby="nameHelp" placeholder="Last Name" onChange={handleChanges} />
                {error && error.lastName && <p className='text-danger mt-1'>{error.lastName}</p>}
              </div>
              <h5 className='fw-bold '>Login Details</h5>
              <LoginInputs handleChanges={handleChanges} form={form} error={error} />
              <p className='text-muted'>Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number</p>
              <div className="form-group mb-4 d-flex">
                <input type="checkbox" className="form-check-input me-1" />
                <label className="form-check-label">By clicking 'Log In' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</label>
              </div>
              <div className="form-group mb-4">
                <input type="checkbox" className="form-check-input me-1" name="keepLoggedIn" id="keepLoggedIn" />
                <label htmlFor="keepLoggedIn">Keep me logged in - applies to all log in options below. More info</label>
              </div>
              <AuthButton buttonName={"REGISTER"} loading={loading} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
