import axios from './axiosInstance';

export const getAllAppointments = async () => {
  try {
    const response = await axios.get('/getAllAppointments');
    return response.data.appointments;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Lỗi từ server!");
    } else {
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
    }
  }
};
