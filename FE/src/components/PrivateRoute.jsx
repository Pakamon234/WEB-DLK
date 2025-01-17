import React from 'react';
import { Navigate } from 'react-router-dom';
import { login, decodeToken } from '../services/authService';

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');

  // Kiểm tra token có tồn tại
  if (!token) {
    alert("Bạn cần đăng nhập để truy cập.");
    return <Navigate to="/login" replace />;
  }

  try {
    // Giải mã token
    const decodedToken = decodeToken(token);

    // Kiểm tra xem token có hết hạn không
    if (decodedToken.exp < Date.now() / 1000) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }

    // Kiểm tra vai trò người dùng
    const userRole = decodedToken.sub.role;
    if (roleRequired && userRole !== roleRequired) {
      alert("Bạn không có quyền truy cập vào trang này.");
      return <Navigate to="/" replace />;
    }

    // Nếu token hợp lệ và vai trò phù hợp
    return children;

  } catch (error) {
    console.error("Lỗi khi giải mã token:", error);
    alert("Đã xảy ra lỗi. Vui lòng đăng nhập lại.");
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
