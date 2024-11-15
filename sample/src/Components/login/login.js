import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { loginApiCall } from '../../utils/Api';

const Login = () => {
  const navigate = useNavigate()
  const handleLogin = ()=>{
    loginApiCall()
  }
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Email and Password Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 8;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Reset errors for the changed field
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (formData.password.length < passwordMinLength) {
      newErrors.password = `Password must be at least ${passwordMinLength} characters long.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Login successful!');
    }
  };

  return (
    <div className="LoginContainer">
      <div className='LoginFundo'>
        <h1>Fundo</h1>
        <h2>Sign in</h2>
        <p>Use your Fundoo Account</p>
      </div>
      <form className='LoginForm' onSubmit={handleSubmit}>
        <div className="LoginInput">
          <TextField
            label="Email"
            id="outlined-size-normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <br/>
          <TextField
            label="Password"
            id="outlined-size-normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <br />
        </div>
        <div className='Login-Forget'>
          <Link href="/login" target="_blank" rel="noopener">Forget Password?</Link>
        </div>
        
        <div className="LoginLink">
          <Link onClick={()=>navigate(`/register`)} target="_blank" rel="noopener">Create Account</Link>
          <Button onClick={handleLogin} variant="contained" type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
