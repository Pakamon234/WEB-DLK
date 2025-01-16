import axios from './axiosInstance';

// Lấy chi tiết một văn phòng
export const getOfficeDetails = async (officeId) => {
  try {
    const response = await axios.get(`/getOfficeDetails/${officeId}`);
    return response.data.office;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Lỗi từ server!");
    } else {
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
    }
  }
};

// Thêm văn phòng mới
export const addVanPhong = async (vanPhongData) => {
  try {
    const response = await axios.post('/vanphong', vanPhongData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Lỗi từ server!");
    } else {
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
    }
  }
};

// Cập nhật văn phòng
export const updateVanPhong = async (officeId, updatedData) => {
  try {
    const response = await axios.put(`/vanphong/${officeId}`, updatedData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Lỗi từ server!");
    } else {
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
    }
  }
};

// Xóa văn phòng
export const deleteVanPhong = async (officeId) => {
  try {
    const response = await axios.delete(`/vanphong/${officeId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Lỗi từ server!");
    } else {
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
    }
  }
};
