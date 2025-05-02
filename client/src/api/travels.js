import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTravels = async (page = 1, limit = 10, sortBy = 'createdAt', order = 'desc') => {
  try {
    const response = await axios.get(`${API_URL}/travels`, {
      params: { page, limit, sortBy, order }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching travels:', error);
    throw error;
  }
};

export const createTravel = async (travelData) => {
  try {
    const response = await axios.post(`${API_URL}/travels`, travelData);
    return response.data;
  } catch (error) {
    console.error('Error creating travel:', error);
    throw error;
  }
}; 