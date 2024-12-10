import React from 'react';
import './AdminPage.css'; // Thêm CSS để định dạng giao diện

const AdminPage = () => {
  return (
    <div className="admin-page">
      <aside className="sidebar">
        <h3>Quản lý</h3>
        <ul>
          <li><a href="/admin/doctors">Bác sĩ</a></li>
          <li><a href="/admin/patients">Bệnh nhân</a></li>
        </ul>
      </aside>
      <main className="content">
        <h2>Chào mừng đến trang Admin</h2>
        <p>Chọn một mục từ menu bên trái để quản lý thông tin.</p>
      </main>
      
    </div>
  );
};

export default AdminPage;
