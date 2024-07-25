import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL); 

export const getParticipants = async () => {
  try {
    const response = await axios.get(`${API_URL}/participants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/current-user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
export const addEvent = async (event) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/add-event`, event, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const postHistory = async (historyData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/meeting-history`, historyData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving meeting history:', error);
    throw error;
  }
};
export const getHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/meeting-history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching meeting history:', error);
    throw error;
  }
};
