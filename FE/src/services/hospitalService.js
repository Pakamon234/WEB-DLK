import axios from './axiosInstance';

// Thêm liên kết bệnh viện
export const addLienKetBenhVien = async (data) => {
  const response = await axios.post('/lienketbenhvien', data);
  return response.data;
};

// Sửa liên kết bệnh viện
export const updateLienKetBenhVien = async (id, data) => {
  const response = await axios.put(`/lienketbenhvien/${id}`, data);
  return response.data;
};

// Xóa liên kết bệnh viện
export const deleteLienKetBenhVien = async (id) => {
  const response = await axios.delete(`/lienketbenhvien/${id}`);
  return response.data;
};
