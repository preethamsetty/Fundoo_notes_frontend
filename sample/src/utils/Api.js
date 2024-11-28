import axios from "axios";

// Base URL for the backend API
const BASE_URL = "http://localhost:8000/api/v1";

// Function to call the register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred while registering.";
    throw new Error(errorMessage);
  }
};

// Function to call the login API
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Invalid email or password.";
    throw new Error(errorMessage);
  }
};

// Function to fetch notes
export const fetchNotes = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in.");

  try {
    const response = await axios.get(`${BASE_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error fetching notes.";
    throw new Error(errorMessage);
  }
};

export const createNote = async (noteData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in.");

  try {
    const response = await axios.post(`${BASE_URL}/notes`, noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error creating note.";
    throw new Error(errorMessage);
  }
};

export const updateNote = async (id, noteData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in.");

  // Extract only required fields and map `backgroundColor` to `color`
  const { backgroundColor, title, description } = noteData;
  const updatePayload = {
    title,
    description,
    color: backgroundColor, // Map `backgroundColor` to `color`
  };

  try {
    console.log("Updating note with ID:", id);
    console.log("Payload being sent:", updatePayload);

    const response = await axios.put(`${BASE_URL}/notes/${id}`, updatePayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from server:", response.data);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error updating note.";
    console.error("Error in updateNote:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to archive a note
export const archiveNote = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User is not logged in.');

  try {
    const response = await axios.put(`${BASE_URL}/notes/${id}/archive`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error archiving note.';
    throw new Error(errorMessage);
  }
};

export const trashNote = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in.");

  try {
    const response = await axios.put(
      `${BASE_URL}/notes/${id}/trash`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error trashing note.";
    throw new Error(errorMessage);
  }
};

export const deleteNotePermanently = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not logged in.");

  try {
    const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error deleting note permanently.";
    throw new Error(errorMessage);
  }
};
