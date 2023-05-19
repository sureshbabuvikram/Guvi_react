import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let err = Validation(values);
        setErrors(err);
        if (err.email === '' && err.password === '') {
            // await axios.post('http://localhost:4000/api/user/login', values)
            await axios.post('https://guvi-nodejs-backend.vercel.app/api/user/login', values)
                .then(res => {
                    let message = res.data.message;
                    if (res.data.message === 'User login successfully') {
                        localStorage.setItem('email', values.email);
                        alert(message)
                        navigate('/profile')
                    } else {
                        alert(message)
                    }
                })
                .catch(err => alert("user not valid"))
        }
    }
    function Validation(values) {
        let error = {}
        var mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (values.email === '') {
            error.email = "Email must not be empty";
        } else if (!mailFormat.test(values.email)) {
            error.email = "Email does not Match";
        } else {
            error.email = "";
        }
        if (values.password === '') {
            error.password = "password must not be empty";
        } else if (!passwordFormat.test(values.password)) {
            error.password = "Password do not match";
        } else {
            error.password = "";
        }
        return error;
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h4><strong><center>Login Page</center></strong></h4>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' name='email' value={values.email} placeholder='Enter Mail' onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' name='password' value={values.password} placeholder='Enter Password' onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}

                    </div>
                    <button type='submit' className='btn btn-success w-100 '><strong>Login</strong></button>
                    <Link to='/register' className='btn btn-link border w-100 text-decoration-none'> Register</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;



