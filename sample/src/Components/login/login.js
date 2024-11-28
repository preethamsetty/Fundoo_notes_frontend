import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import { TextField, Button, Link, Typography } from '@mui/material';
import { loginUser } from '../../utils/Api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 8;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
    setApiError('');
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        alert(response.message || 'Login successful!');
        
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        navigate('/dashboard/notes');
      } catch (error) {
        setApiError(error || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="LoginContainer">
      <div className='LoginFundo'>
        <Typography variant="h4" color="primary" gutterBottom>Fundo</Typography>
        <Typography variant="h5" gutterBottom>Sign in</Typography>
        <Typography variant="body2" gutterBottom style={{ marginBottom: '1px' }}>Use your Fundo Account</Typography>
      </div>
      
      <form className='LoginForm' onSubmit={handleSubmit}>
        <div className="LoginInput">
          <TextField
            label="Email"
            id="outlined-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            label="Password"
            id="outlined-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            margin="normal"
            size="small"
          />
        </div>

        {apiError && <p className="error-message">{apiError}</p>}

        <div className='Login-Forget'>
          <Link href="/forgot-password" underline="none">Forget Password?</Link>
        </div>
        
        <div className="LoginLink">
          <Typography variant="body2">
            <Link onClick={() => navigate(`/register`)} underline="none">
              Create Account
            </Link>
          </Typography>
          <Button 
            variant="contained" 
            type="submit" 
            disabled={isLoading}
            color="primary"
            size="medium"
            style={{ width: 'auto', minWidth: '100px' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
