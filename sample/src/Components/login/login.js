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

        navigate('/dashboard');
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

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.css'; 
// import { TextField, Button, Link, Typography } from '@mui/material';
// import { loginUser } from '../../utils/Api'; // Importing the login API call

// const Login = () => {
//   const navigate = useNavigate();

//   // State hooks for form data, errors, API error message, loading state
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({
//     email: '',
//     password: ''
//   });

//   const [apiError, setApiError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Regular expressions and constants for validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordMinLength = 8;

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//     setErrors({
//       ...errors,
//       [name]: '' // Resetting errors when user changes input
//     });
//     setApiError(''); // Resetting API error message
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     // Email validation
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Invalid email format.';
//     }

//     // Password validation
//     if (formData.password.length < passwordMinLength) {
//       newErrors.password = `Password must be at least ${passwordMinLength} characters long.`;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return false if there are validation errors
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError(''); // Clear previous API error

//     // Perform validation before submitting the form
//     if (validateForm()) {
//       setIsLoading(true); // Set loading state while waiting for API response
//       try {
//         // Call the loginUser API function with form data (email and password)
//         const response = await loginUser({
//           email: formData.email,
//           password: formData.password,
//         });

//         // If login is successful, store the token and navigate to the notes page
//         alert(response.message || 'Login successful!');
        
//         if (response.token) {
//           localStorage.setItem('token', response.token); // Store JWT token in localStorage
//         }

//         navigate('/dashboard/'); // Redirect to the notes page after successful login
//       } catch (error) {
//         // Handle error if login fails
//         setApiError(error || 'Login failed. Please try again.');
//       } finally {
//         setIsLoading(false); // Stop loading state once the API call is complete
//       }
//     }
//   };

//   return (
//     <div className="LoginContainer">
//       <div className='LoginFundo'>
//         <Typography variant="h4" color="primary" gutterBottom>Fundo</Typography>
//         <Typography variant="h5" gutterBottom>Sign in</Typography>
//         <Typography variant="body2" gutterBottom style={{ marginBottom: '1px' }}>Use your Fundo Account</Typography>
//       </div>
      
//       <form className='LoginForm' onSubmit={handleSubmit}>
//         <div className="LoginInput">
//           {/* Email input field */}
//           <TextField
//             label="Email"
//             id="outlined-email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email} // Show error if email is invalid
//             helperText={errors.email} // Display error message for email
//             required
//             fullWidth
//             margin="normal"
//             size="small"
//           />
//           {/* Password input field */}
//           <TextField
//             label="Password"
//             id="outlined-password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password} // Show error if password is invalid
//             helperText={errors.password} // Display error message for password
//             required
//             fullWidth
//             margin="normal"
//             size="small"
//           />
//         </div>

//         {/* Display API error message if there's any */}
//         {apiError && <p className="error-message">{apiError}</p>}

//         <div className='Login-Forget'>
//           {/* Link to the forgot password page */}
//           <Link href="/forgot-password" underline="none">Forget Password?</Link>
//         </div>
        
//         <div className="LoginLink">
//           {/* Link to the registration page */}
//           <Typography variant="body2">
//             <Link onClick={() => navigate(`/register`)} underline="none">
//               Create Account
//             </Link>
//           </Typography>
          
//           {/* Submit button */}
//           <Button 
//             variant="contained" 
//             type="submit" 
//             disabled={isLoading} // Disable button if it's in loading state
//             color="primary"
//             size="medium"
//             style={{ width: 'auto', minWidth: '100px' }}
//           >
//             {isLoading ? 'Logging in...' : 'Login'} {/* Button text changes based on loading state */}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
