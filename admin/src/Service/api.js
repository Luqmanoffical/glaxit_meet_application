import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL); 

export const addParticipant = async (participant) => {
  try {
    console.log(`${API_URL}/participants`); 
    const response = await axios.post(`${API_URL}/participants`, participant);
    return response.data;
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
};

export const getParticipants = async () => {
  try {
    const response = await axios.get(`${API_URL}/participants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

export const updateParticipant = async (participant) => {
  try {

    console.log(`${API_URL}/participants/${participant._id}`);
    if (!participant._id) {
      throw new Error("Participant ID is required for update");
    }  
    const response = await axios.put(`${API_URL}/participants/${participant._id}`, participant);
    return response.data;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }

};

export const deleteParticipant = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/participants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting participant:', error);
    throw error;
  }
};
