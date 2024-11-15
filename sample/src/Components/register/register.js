import React, { useState } from 'react';
import './register.css'; 
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import image1 from '../../assets/image.png';

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Email and Password Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, including letters, numbers, and symbols.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="RegisterPage">
      <div className="RegisterContainer">
        <h1>Fundo</h1>
        <h2>Create your Fundo Account</h2>
        <form className='RegisterForm' onSubmit={handleSubmit}>
          <div className="RegisterInput-group-1">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              id="outlined-size-normal"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div className="RegisterEmail">
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
          </div>
          <p>You can use letters, numbers and periods</p>
          <div className="RegisterPassword">
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
            <TextField
              label="Confirm"
              id="outlined-size-normal"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
            />
          </div>
          <p>Use 8 or more characters with letters, numbers, and symbols</p>
          <div className="RegisterLink">
            <Link onClick={()=>navigate(`/`)} target="_blank" rel="noopener">
              Sign in instead
            </Link>
            <Button variant="contained" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
      <div className="RegisterImage">
        <br/>
        <img src={image1} alt="Signup visual" width="100%" />
        <br/>
        <p1>One account. All of Fundo working for you.</p1>
      </div>
    </div>
  );
};

export default Register;
