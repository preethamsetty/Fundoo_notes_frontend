import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:8000/api/v1/users'; 

// Function to call the register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, userData);
    return response.data; 
  } catch (error) {
    // Handle errors from the API call
    const errorMessage = error.response?.data?.message || 'An error occurred while registering.';
    throw errorMessage;
  }
};

// Function to call the login API
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data; 
  } catch (error) {
    // Handle errors from the API call
    const errorMessage = error.response?.data?.message || 'Invalid email or password.';
    throw errorMessage;
  }
};
