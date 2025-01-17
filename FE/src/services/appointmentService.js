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
export const getAppointmentsByOffice = async () => {
  try {
    const response = await axios.get(`/appointments`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || 'Lỗi từ server!');
    } else {
      throw new Error('Lỗi kết nối mạng hoặc server không phản hồi.');
    }
  }
};

export const updateAppointmentStatus = async (appointmentId, newStatus) => {
  try {
    const response = await axios.put(`/appointments/${appointmentId}/update_status`, {
      trang_thai: newStatus,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || 'Lỗi từ server!');
    } else {
      throw new Error('Lỗi kết nối mạng hoặc server không phản hồi.');
    }
  }
};