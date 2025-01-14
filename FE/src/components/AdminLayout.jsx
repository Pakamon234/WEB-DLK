// AdminLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLayout.css'; // Nếu có CSS chung cho toàn bộ layout

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-page">
      <aside className="sidebar">
        <h3>Quản lý</h3>
        <ul>
          <li><Link to="/admin/doctors">Bác sĩ</Link></li>
          <li><Link to="/admin/patients">Bệnh nhân</Link></li>
          <li><Link to="/admin/appointments">Lịch hẹn</Link></li>
        </ul>
      </aside>
      <main className="content">
        {children} {/* Hiển thị các trang con như DoctorPage, PatientPage */}
      </main>
    </div>
  );
};

export default AdminLayout;
