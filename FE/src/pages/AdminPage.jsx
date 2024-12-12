import React from 'react';
import AdminLayout from '../components/AdminLayout';  // Import AdminLayout từ components

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h2>Chào mừng đến với trang Quản lý Admin</h2>
        <p>Chọn một mục từ menu bên trái để quản lý thông tin của bác sĩ, bệnh nhân, và các chức năng khác.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
