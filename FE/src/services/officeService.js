import axios from './axiosInstance';

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
