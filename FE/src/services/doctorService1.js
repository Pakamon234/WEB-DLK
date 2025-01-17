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
export const loginDoctor = async (username, password) => {
  const response = await axios.post('/doctor', { username, password });
  return response.data;
};

export const updateDoctorImage = async (doctorId, imageBase64) => {
  try {
    const response = await axios.put(`/editDoctorImage/${doctorId}`, {
      hinh_anh: imageBase64,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Lỗi khi cập nhật hình ảnh.');
  }
};
