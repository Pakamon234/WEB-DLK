import axios from './axiosInstance';  // Đảm bảo axiosInstance đã được cấu hình trước đó

// Lấy tất cả người dùng từ API
export const getAllUsers = async () => {
  try {
    const response = await axios.get('/getAllUsers');
    return response.data;  // Trả về dữ liệu người dùng
  } catch (error) {
    // Xử lý lỗi
    if (error.response) {
      // Nếu có phản hồi từ server
      throw new Error(error.response.data.msg || "Lỗi không xác định!");
    } else {
      // Nếu không có phản hồi từ server
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi");
    }
  }
};
