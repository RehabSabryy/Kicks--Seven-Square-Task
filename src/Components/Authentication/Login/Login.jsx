import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginInputs from '../LoginInputs'
import AuthButton from '../AuthButton'
import Joi from 'joi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import KeepMeLogged from '../KeepMeLogged'

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // validate form
    const schema = Joi.object({
        email:Joi.string().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
            'string.empty': 'Email is required',
        }),
        password : Joi.string().required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
        })

    })
    //handle input changes
    const handleChanges = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }
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
        }
        setLoading(true);
        setError(null);
        
        try {
            const {data} = await axios.post('https://www.sevensquare.net/api/user/login', form);
            if(data.code === 200) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', data.data.name);
                navigate('/layout/dashboard');
            }
        } catch (error) {      
            setLoading(false);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || 'Login failed. Please try again.';
                setError({ general: errorMessage });

            } else {
                setError({ general: 'Login failed. Please try again.' });
            }
        }
    }
  return (
    <>
        <div className="container-fluid row">
            <div className="col-md-5 p-0">
                <img src="/Images/auth.png" className="full-height auth-img w-100" alt="kicks"/>
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center">
                <div className="container px-5 w-75 m-auto auth-container">
                    <h1 className="fw-bold">Login</h1>
                    <Link className='text-black fw-semibold'>Forgot your password?</Link>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <LoginInputs handleChanges={handleChanges} form={form} error={error} />
                        <KeepMeLogged />
                        <AuthButton buttonName={"EMAIL LOGIN"} loading={loading}/>
                    </form>
                    <p className="mt-3">Don't have an account? <Link to="/register" className='text-black'>Register</Link></p>
                </div>
        </div>
        </div>
    </>
  )
}
