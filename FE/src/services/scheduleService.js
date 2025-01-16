import axios from './axiosInstance';

// Thêm lịch trình
export const addSchedule = async (data) => {
  const response = await axios.post('/lichtrinh', data);
  return response.data;
};

// Sửa lịch trình
export const updateSchedule = async (id, data) => {
  const response = await axios.put(`/lichtrinh/${id}`, data);
  return response.data;
};

// Xóa lịch trình
export const deleteSchedule = async (id) => {
  const response = await axios.delete(`/lichtrinh/${id}`);
  return response.data;
};
