import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService'; // Import hàm từ userService.js
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import AdminLayout from '../components/AdminLayout'; 
const PatientPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();  // Gọi hàm getAllUsers từ service
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);  // Hiển thị thông báo lỗi
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
    <div>
      <h2>Danh sách người dùng</h2>

      {loading && <p>Đang tải dữ liệu...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.ho}</td>
                <td>{user.ten}</td>
                <td>{user.sdt}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </AdminLayout>
  );
};

export default PatientPage;
