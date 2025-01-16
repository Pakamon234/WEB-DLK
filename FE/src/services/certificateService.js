import axios from './axiosInstance';

// Thêm bằng cấp/chứng chỉ
export const addCertificate = async (data) => {
  const response = await axios.post('/bangcapchungchi', data);
  return response.data;
};

// Sửa bằng cấp/chứng chỉ
export const updateCertificate = async (id, data) => {
  const response = await axios.put(`/bangcapchungchi/${id}`, data);
  return response.data;
};

// Xóa bằng cấp/chứng chỉ
export const deleteCertificate = async (id) => {
  const response = await axios.delete(`/bangcapchungchi/${id}`);
  return response.data;
};
