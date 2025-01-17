import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
const API_URL = ''; // Thay đổi URL nếu cần

export const login = async (username, password) => {
    const response = await axios.post('http://10.252.1.239:7777/login', { username, password });
    return response.data;
};

export const decodeToken = (token) => {
    return jwtDecode(token);
};


export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://10.252.1.239:7777/register', userData);
    return response;
  } catch (error) {
    throw error;
  }
};
