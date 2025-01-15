import axios from './axiosInstance';

// Lấy danh sách CT Khoa
export const getAllCtKhoa = async () => {
  try {
    const response = await axios.get('/ct_khoa');
    return response.data.ct_khoa;
  } catch (error) {
    handleApiError(error);
  }
};

// Thêm mới CT Khoa
export const addCtKhoa = async (ctKhoaData) => {
  try {
    const response = await axios.post('/ct_khoa/add', ctKhoaData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Sửa CT Khoa
export const updateCtKhoa = async (id, ctKhoaData) => {
  try {
    const response = await axios.put(`/ct_khoa/edit/${id}`, ctKhoaData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Xóa CT Khoa
export const deleteCtKhoa = async (id) => {
  try {
    const response = await axios.delete(`/ct_khoa/delete/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Lấy danh sách tất cả các khoa
export const doctor = async () => {
    try {
      const response = await axios.get('/bacsi');
      return response.data.bacsi_list; // Trả về danh sách các khoa
    } catch (error) {
      handleApiError(error);
    }
  };

// Hàm xử lý lỗi chung
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.msg || 'Lỗi không xác định từ server!');
  } else {
    throw new Error('Lỗi kết nối mạng hoặc server không phản hồi.');
  }
};
