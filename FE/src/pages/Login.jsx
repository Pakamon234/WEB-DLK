import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, decodeToken } from '../services/authService'; // Dùng cho Admin
import { loginDoctor } from '../services/doctorService1'; // Dùng cho Doctor
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('admin'); // Tab mặc định là Admin
  const navigate = useNavigate();

  // Hàm validate form
  const validateForm = () => {
    if (username.length < 3) {
      setMessage('Tên đăng nhập phải có ít nhất 3 ký tự.');
      return false;
    }
    if (password.length < 3) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      let data;
      if (activeTab === 'admin') {
        data = await login(username, password);
      } else {
        data = await loginDoctor(username, password);
      }

      if (!data.token) {
        setMessage('Không nhận được token từ server.');
        setIsLoading(false);
        return;
      }

      // Giải mã token để lấy thông tin người dùng
      const decodedToken = decodeToken(data.token);
      if (decodedToken.exp < Date.now() / 1000) {
        setMessage('Token đã hết hạn. Vui lòng đăng nhập lại.');
        setIsLoading(false);
        return;
      }

      // Lưu token vào localStorage
      localStorage.setItem('token', data.token);

      // Điều hướng người dùng theo vai trò
      const { role } = decodedToken.sub;
      alert('Đăng nhập thành công!');
      if(role === 'doctor'){
        navigate('/doctor');
      }
      if(role === 'admin'){
        navigate('/admin');
      }
      
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Đã xảy ra lỗi không xác định!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Đăng nhập</h1>

        {/* Tabs */}
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
          <button
            className={`tab-button ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctor')}
          >
            Doctor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Nhập tên đăng nhập (${activeTab})`}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
