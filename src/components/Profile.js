import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const [values, setValues]= useState({
        age:"",
        gender:'',
        dob:'',
        mobile:'',
        address:''});
    const [errors,setErrors]= useState({}); 
    const navigate= useNavigate();
    useEffect(()=>{
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            setValues(prev=>({...prev,email:userEmail}));
        }
    },[]);    
    const handleInput=(event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))    
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        let err=Validation(values);
        console.log("err",err)
        setErrors(err);
        if(err.age ==='' && err.gender ==='' && err.dob ==='' && err.mobile === '' && err.address === ''){
            // setValues({email:userMail})
            // await axios.post('http://localhost:4000/api/user/updateuser',values)
            await axios.post('https://vercel.com/sureshbabuvikram/guvi-nodejs-backend/api/user/updateuser',values)
            .then(res=>{
                let message=res.data.message;
                if(res.data.message === "User updated successfully"){                    
                    alert(message);     
                    navigate('/profile')
                }else{
                    alert(message)
                }
                })
            .catch(res=>alert("User not found"))
        }
    }   
    
    function Validation(values){
        let error={} ;    
        console.log("values",values)
        if(values.age === ''){
            error.age= "age must not be empty";
        }else {       
            error.age="";
        }  
        if(values.gender === ''){
            error.gender= "gender must not be empty";
        }else {       
            error.gender="";
        }  
        if(values.dob === ''){
            error.dob= "dob must not be empty";
        }else {       
            error.dob="";
        }  
        if(values.mobile === ''){
            error.mobile= "mobile must not be empty";
        }else {       
            error.mobile="";
        }  
        if(values.address === ''){
            error.address= "address must not be empty";
        }else {       
            error.address="";
        }        
        return error;     
    }
    
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h4><strong><center>Profile Page</center></strong></h4>
            <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
                    <label htmlFor='Age'><strong>Age</strong></label>
                    <input type='text' name='age' value={values.age} placeholder='Enter Age' onChange={handleInput} className='form-control rounded-0' />
                    {errors.age && <span className='text-danger'>{errors.age}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='gender'><strong>Gender</strong></label>
                    <input type='text' name='gender' value={values.gender} placeholder='Enter gender' onChange={handleInput} className='form-control rounded-0' />
                    {errors.gender && <span className='text-danger'>{errors.gender}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='dob'><strong>Dob</strong></label>
                    <input type='text' name='dob' placeholder='Enter dob' onChange={handleInput} className='form-control rounded-0' />
                    {errors.dob && <span className='text-danger'>{errors.dob}</span>}                    
                </div>
                <div className='mb-3'>
                    <label htmlFor='mobile'><strong>Mobile</strong></label>
                    <input type='text' name='mobile' placeholder='Enter mobile ' onChange={handleInput} className='form-control rounded-0' />
                    {errors.mobile && <span className='text-danger'>{errors.mobile}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='address'><strong>Address</strong></label>
                    <input type='text' name='address' placeholder='Enter address ' onChange={handleInput} className='form-control rounded-0' />
                    {errors.address && <span className='text-danger'>{errors.address}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 '><strong>Update</strong></button>
                <Link to='/' className='btn btn-link border w-100 text-decoration-none'> Logout</Link>
            </form>
        </div>      
    </div>
  )
}

export default Profile;