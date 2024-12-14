// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate để điều hướng
import { registerUser } from '../services/authService'; // Import hàm đăng ký từ service
import './RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate(); // Khai báo hook navigate để điều hướng
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ho: '',
    ten: '',
    email: '',
    sdt: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, password, ho, ten, email, sdt } = formData;

    // Validate input fields
    if (!username || !password || !ho || !ten || !sdt) {
      setMessage("Cần nhập đầy đủ username, password, họ, tên và số điện thoại.");
      setIsLoading(false);
      return;
    }

    // Validate that 'ho' and 'ten' only contain letters (A-Z, a-z, including Vietnamese characters)
    const nameRegex = /^[A-Za-zÀ-ÿ]+$/;
    if (!nameRegex.test(ho)) {
      setMessage("Họ chỉ được phép chứa chữ.");
      setIsLoading(false);
      return;
    }

    if (!nameRegex.test(ten)) {
      setMessage("Tên chỉ được phép chứa chữ.");
      setIsLoading(false);
      return;
    }

    // Validate phone number 'sdt' contains only 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(sdt)) {
      setMessage("Số điện thoại phải là 10 chữ số.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        // Khi đăng ký thành công, lấy thông báo từ API và hiển thị
        setMessage(response.data.msg || "Đăng ký thành công!");

        // Chuyển hướng về trang login
        setTimeout(() => {
          navigate('/login');  // Chuyển hướng về trang login
        }, 1000);  // Chờ 1 giây để người dùng đọc thông báo thành công
      } else {
        // Nếu có lỗi, hiển thị thông báo lỗi từ API
        setMessage(response.data.msg || "Lỗi không xác định!");
      }
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có exception xảy ra
      setMessage(error.response?.data?.msg || "Lỗi không xác định!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ho">Họ</label>
          <input
            type="text"
            id="ho"
            name="ho"
            value={formData.ho}
            onChange={handleChange}
            placeholder="Nhập họ"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ten">Tên</label>
          <input
            type="text"
            id="ten"
            name="ten"
            value={formData.ten}
            onChange={handleChange}
            placeholder="Nhập tên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sdt">Số điện thoại</label>
          <input
            type="text"
            id="sdt"
            name="sdt"
            value={formData.sdt}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterForm;
