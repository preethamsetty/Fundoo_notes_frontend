import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { loginUser } from '../../utils/Api'; // Import the login API function
import image1 from '../../assets/image.png'; // Optional: If you have an image for login

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

  const [apiError, setApiError] = useState(''); // To handle API errors
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

  // Email and Password Validation Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 8;

  // Handle input changes
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

    // Reset API error when user starts typing
    setApiError('');
  };

  // Form validation
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Reset API error

    if (validateForm()) {
      setIsLoading(true);
      try {
        // Call the login API
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        // Handle successful login
        alert(response.message || 'Login successful!');
        
        // Example: Store the token in localStorage (adjust based on your API response)
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        // Redirect to the dashboard or desired page
        navigate('/dashboard'); // Replace with your actual dashboard route
      } catch (error) {
        // Handle errors from the API
        setApiError(error || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="LoginContainer">
      <div className='LoginFundo'>
        <h1>Fundo</h1>
        <h2>Sign in</h2>
        <p>Use your Fundo Account</p>
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
            required
            fullWidth
            margin="normal"
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
            required
            fullWidth
            margin="normal"
          />
        </div>

        {/* Display API error */}
        {apiError && <p className="error-message">{apiError}</p>}

        <div className='Login-Forget'>
          <Link href="/forgot-password" target="_blank" rel="noopener">Forget Password?</Link>
        </div>
        
        <div className="LoginLink">
          <Link onClick={() => navigate(`/register`)} style={{ cursor: 'pointer', marginRight: 'auto' }} rel="noopener">
            Create Account
          </Link>
          <Button 
            variant="contained" 
            type="submit" 
            disabled={isLoading}
            color="primary"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>

      {/* Optional: Add an image or illustration */}
      {/* <div className="LoginImage">
        <img src={image1} alt="Login visual" width="100%" />
        <p>One account. All of Fundo working for you.</p>
      </div> */}
    </div>
  );
};

export default Login;
