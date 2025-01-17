import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.252.1.239:7777/',  // Thay đổi baseURL nếu API của bạn không phải ở root
});

// Thêm interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Lấy token từ localStorage (hoặc cookie)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Thêm token vào header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
