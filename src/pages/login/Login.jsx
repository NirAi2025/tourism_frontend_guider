import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

const Login = () => {
      const [errors, setErrors] = useState({});
const [authdata, setAuthdata] = useState({
    email:"",
    password:""
})

  // Email Validate

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const validateStep = () => {
    const newErrors = {};

         if (!authdata.email?.trim())
          newErrors.email = "Email is required";
         else if (!isValidEmail(authdata.email)) {
          newErrors.email = "Enter a valid email address";
        }
           if (!authdata.password?.trim())
          newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const LoginHandle = () => {

    if (validateStep()) {
        console.warn("ghjkl")
    }
  };

    const updateProfileFormData = (field, value) => {
    setAuthdata((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };


  return (
    <Container>
            <div className='Login-form'>
                <h3>Login</h3>
                 <div className='form-group'>
                  <label>Email <span className='atrisk'>*</span></label>
                  <input
                   value={authdata.email ?? ""}
                 onChange={(e) => updateProfileFormData("email", e.target.value)}
                 className={
                    errors.email
                      ? "border-line form-control"
                      : "form-control"
                  }
                  type='email' placeholder='Enter your email' />
                 
                   {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
                </div>
                <div className='form-group'>
                  <label>Password <span className='atrisk'>*</span></label>
                  <input
                   value={authdata.password ?? ""}
                 onChange={(e) => updateProfileFormData("password", e.target.value)}
                  type='password'  className={
                    errors.password
                      ? "border-line form-control"
                      : "form-control"
                  } placeholder='XXXXXXXXX' />
                   {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                </div>
                 <div className='form-group d-flex justify-content-between'>
                    <button className='themeBttn' onClick={LoginHandle}>Login</button>
                    <button>Forgot Password ?</button>
                 </div>
                
            </div>
        
    </Container>
  )
}

export default Login