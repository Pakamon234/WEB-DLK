import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Dùng để điều hướng

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token hoặc thông tin xác thực
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div className="admin-page">
      <aside className="sidebar">
        <h3>Quản lý</h3>
        <ul>
          <li><Link to="/admin/doctors">Bác sĩ</Link></li>
          <li><Link to="/admin/patients">Bệnh nhân</Link></li>
          <li><Link to="/admin/appointments">Lịch hẹn</Link></li>
          <li className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
              Khoa
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>&#9662;</span>
            </div>
            <ul className={`dropdown-list ${isDropdownOpen ? 'open' : ''}`}>
              <li><Link to="/admin/department">DS Khoa</Link></li>
              <li><Link to="/admin/ct-khoa">BS theo Khoa</Link></li>
            </ul>
          </li>
        </ul>
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
        </div>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
