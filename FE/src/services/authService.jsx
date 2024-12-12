import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

export const login = async (username, password) => {
    const response = await axios.post('http://127.0.0.1:7777/login', { username, password });
    return response.data;
};

export const decodeToken = (token) => {
    return jwtDecode(token);
};
