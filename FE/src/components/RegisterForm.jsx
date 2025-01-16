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
    cccd: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Lưu thông tin lỗi từng trường
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    ho: '',
    ten: '',
    email: '',
    sdt: '',
    cccd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Xử lý validate khi người dùng nhập
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'username':
        if (!value) {
          errorMessage = "Tên đăng nhập không được để trống.";
        }
        break;
      case 'password':
        if (!value) {
          errorMessage = "Mật khẩu không được để trống.";
        }
        break;
      case 'ho':
        const nameRegex = /^[A-Za-zÀ-ÿ]+$/;
        if (!value) {
          errorMessage = "Họ không được để trống.";
        } else if (!nameRegex.test(value)) {
          errorMessage = "Họ chỉ được phép chứa chữ.";
        }
        break;
      case 'ten':
        const nameRegexTen = /^[A-Za-zÀ-ÿ]+$/;
        if (!value) {
          errorMessage = "Tên không được để trống.";
        } else if (!nameRegexTen.test(value)) {
          errorMessage = "Tên chỉ được phép chứa chữ.";
        }
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!value) {
          errorMessage = "Email không được để trống.";
        } else if (!emailRegex.test(value)) {
          errorMessage = "Email không hợp lệ.";
        }
        break;
      case 'sdt':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value) {
          errorMessage = "Số điện thoại không được để trống.";
        } else if (!phoneRegex.test(value)) {
          errorMessage = "Số điện thoại phải là 10 chữ số.";
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // // Validate toàn bộ form trước khi gửi
    // const { username, password, ho, ten, email, sdt } = formData;
    // if (!username || !password || !ho || !ten || !sdt) {
    //   setMessage("Cần nhập đầy đủ thông tin.");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        setMessage(response.data.msg || "Đăng ký thành công!");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(response.data.msg || "Lỗi không xác định!");
      }
    } catch (error) {
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
          {errors.username && <p className="error-message">{errors.username}</p>}
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
          {errors.password && <p className="error-message">{errors.password}</p>}
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
          {errors.ho && <p className="error-message">{errors.ho}</p>}
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
          {errors.ten && <p className="error-message">{errors.ten}</p>}
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
          {errors.email && <p className="error-message">{errors.email}</p>}
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
          {errors.sdt && <p className="error-message">{errors.sdt}</p>}
        </div>
        {/* <div className="form-group">
          <label htmlFor="cccd">CCCD</label>
          <input
            type="text"
            id="cccd"
            name="cccd"
            value={formData.cccd}
            onChange={handleChange}
            placeholder="Nhập CCCD"
          />
        </div> */}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterForm;
