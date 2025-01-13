import axios from './axiosInstance'; // Đảm bảo axiosInstance đã được cấu hình trước đó

// Lấy tất cả người dùng từ API
export const getAllUsers = async () => {
  try {
    const response = await axios.get('/getAllUsers');
    return response.data; // Trả về dữ liệu người dùng
  } catch (error) {
    handleApiError(error);
  }
};

// Thêm người dùng mới
export const addUser = async (userData) => {
  try {
    const response = await axios.post('/addUser', userData);
    return response.data; // Trả về phản hồi thành công
  } catch (error) {
    handleApiError(error);
  }
};

// Chỉnh sửa người dùng
export const editUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`/editUser/${userId}`, updatedData);
    return response.data; // Trả về phản hồi thành công
  } catch (error) {
    handleApiError(error);
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/deleteUser/${userId}`);
    return response.data; // Trả về phản hồi thành công
  } catch (error) {
    handleApiError(error);
  }
};

// Hàm xử lý lỗi chung
const handleApiError = (error) => {
  if (error.response) {
    // Nếu có phản hồi từ server
    throw new Error(error.response.data.msg || "Lỗi không xác định từ server!");
  } else {
    // Nếu không có phản hồi từ server
    throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
  }
};
