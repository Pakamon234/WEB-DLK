import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './DoctorLayout.css';

const DoctorLayout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div className="doctor-page">
      <aside className="sidebar">
        <h3>Bác sĩ</h3>
        <ul>
          <li>
            <Link to="/doctor">Thông tin cá nhân</Link>
          </li>
          <li>
            <Link to="/doctor/appointments">Lịch trình</Link>
          </li>

        </ul>
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default DoctorLayout;
