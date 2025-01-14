import axios from './axiosInstance';

export const getBookingTypes = async () => {
  try {
    const response = await axios.get('/getBookingTypes');
    return response.data.booking_types;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.msg || "Lỗi từ server!");
    } else {
      throw new Error("Lỗi kết nối mạng hoặc server không phản hồi.");
    }
  }
};
