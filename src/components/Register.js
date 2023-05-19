import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (err.name === '' && err.email === '' && err.password === '') {
            // await axios.post('http://localhost:4000/api/user/register', values)
            await axios.post('https://vercel.com/sureshbabuvikram/guvi-nodejs-backend/api/user/register', values)
                .then(res => {
                    let message = res.data.message;
                    if (res.data.message === 'User registered successfully') {
                        alert(message)
                        navigate('/')
                    } else {
                        alert(message)
                    }
                })
                .catch(err => alert("user already exits"))
        }
    }

    function Validation(values) {
        let error = {}
        var mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (values.name === '') {
            error.name = "name must not be empty";
        } else {
            error.name = "";
        }
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
            error.password = "Password must be Eight/capital/special Characters";
        } else {
            error.password = "";
        }
        if (values.confirmPassword === '') {
            error.confirmPassword = "confirmPassword must not be empty";
        } else if (!passwordFormat.test(values.confirmPassword)) {
            error.confirmPassword = "confirmPassword do not match";
        } else if (values.password === JSON.stringify(values.confirmPassword)) {
            error.confirmPassword = "confirmPassword mismatch";
        } else {
            error.confirmPassword = "";
        }
        return error;
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h4><strong><center>SignIn Page</center></strong></h4>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='Name'><strong>Name</strong></label>
                        <input type='text' name='name' placeholder='Enter Name' onChange={handleInput} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' name='email' placeholder='Enter Mail' onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' name='password' placeholder='Enter Password' onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Confirm Password</strong></label>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleInput} className='form-control rounded-0' />
                        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 '><strong>Register</strong></button>
                    <Link to='/' className='btn btn-link border w-100 text-decoration-none'> Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Register;