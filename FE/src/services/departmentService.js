import axios from './axiosInstance';

// Lấy danh sách tất cả các khoa
export const getAllDepartments = async () => {
  try {
    const response = await axios.get('/getAllDepartments');
    return response.data.departments; // Trả về danh sách các khoa
  } catch (error) {
    handleApiError(error);
  }
};

// Thêm khoa mới
export const addDepartment = async (departmentData) => {
  try {
    const response = await axios.post('/addDepartment', departmentData);
    return response.data; // Trả về phản hồi thành công
  } catch (error) {
    handleApiError(error);
  }
};

// Sửa thông tin khoa
export const editDepartment = async (departmentId, updatedData) => {
  try {
    const response = await axios.put(`/editDepartment/${departmentId}`, updatedData);
    return response.data; // Trả về phản hồi thành công
  } catch (error) {
    handleApiError(error);
  }
};

// Xóa khoa
export const deleteDepartment = async (departmentId) => {
  try {
    const response = await axios.delete(`/deleteDepartment/${departmentId}`);
    return response.data; // Trả về phản hồi thành công
  } catch (error) {
    handleApiError(error);
  }
};

// Hàm xử lý lỗi chung
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.msg || 'Lỗi từ server!');
  } else {
    throw new Error('Lỗi kết nối mạng hoặc server không phản hồi.');
  }
};
