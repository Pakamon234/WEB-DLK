import axios from './axiosInstance';

// Lấy thông tin chi tiết của bác sĩ
export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`/bacsi/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Không thể lấy thông tin bác sĩ.');
  }
};
