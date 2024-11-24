import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://localhost:8000/api/v1'; 

// Function to call the register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data; 
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred while registering.';
    throw new Error(errorMessage);
  }
};

// Function to call the login API
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    return response.data; 
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Invalid email or password.';
    throw new Error(errorMessage);
  }
};

// Function to fetch notes
export const fetchNotes = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not logged in.');

  try {
    const response = await axios.get(`${BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching notes.';
    throw new Error(errorMessage);
  }
};


