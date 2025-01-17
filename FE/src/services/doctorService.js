import axios from 'axios';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` };

export const fetchDoctorsFromAPI = async () => {
  return axios.get('http://10.252.1.239:7777/getAllDoctors', { headers });
};

export const addDoctor = async (doctor) => {
  return axios.post('http://10.252.1.239:7777/addDoctor', doctor, { headers });
};

export const editDoctor = async (id, doctor) => {
  return axios.put(`http://10.252.1.239:7777/editDoctor/${id}`, doctor, { headers });
};

export const deleteDoctor = async (id) => {
  return axios.delete(`http://10.252.1.239:7777/deleteDoctor/${id}`, { headers });
};

