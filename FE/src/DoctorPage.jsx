import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]); // Danh sách bác sĩ
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Danh sách bác sĩ đã lọc
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi
  const [editDoctor, setEditDoctor] = useState(null); // Lưu thông tin bác sĩ cần chỉnh sửa
  const [newDoctor, setNewDoctor] = useState({
    hoc_ham: '',
    ho: '',
    ten: '',
    hinh_anh: '',
    mo_ta: '',
    ngay_bd_hanh_y: '',
    password: '',
    username: '',
  }); // Lưu thông tin bác sĩ mới

  // Lấy danh sách bác sĩ
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:7777/getAllDoctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Hiển thị tất cả bác sĩ ban đầu
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Lỗi từ server!');
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    // Lọc danh sách bác sĩ theo từ khóa
    const filtered = doctors.filter(
      (doctor) =>
        doctor.ho.toLowerCase().includes(keyword) ||
        doctor.ten.toLowerCase().includes(keyword) ||
        doctor.username.toLowerCase().includes(keyword)
    );
    setFilteredDoctors(filtered);
  };

  // Hàm mở form chỉnh sửa
  const handleEditClick = (doctor) => {
    setEditDoctor(doctor); // Đặt bác sĩ cần chỉnh sửa
  };

  // Hàm xử lý lưu chỉnh sửa
  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://127.0.0.1:7777/editDoctor/${editDoctor.id}`,
        editDoctor,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert(response.data.msg); // Thông báo thành công
        setEditDoctor(null); // Đóng form chỉnh sửa
        fetchDoctors(); // Cập nhật danh sách
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Lỗi không xác định!');
    }
  };

  // Cập nhật thông tin bác sĩ khi chỉnh sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý thay đổi thông tin bác sĩ mới
  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm thêm bác sĩ mới
  const handleAddDoctor = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:7777/addDoctor',
        newDoctor,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert(response.data.msg); // Thông báo thành công
        setNewDoctor({
          hoc_ham: '',
          ho: '',
          ten: '',
          hinh_anh: '',
          mo_ta: '',
          ngay_bd_hanh_y: '',
          password: '',
          username: '',
        }); // Reset form
        fetchDoctors(); // Cập nhật danh sách bác sĩ
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Lỗi không xác định!');
    }
  };

  // Hàm xóa bác sĩ
  const handleDeleteDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://127.0.0.1:7777/deleteDoctor/${doctorId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert(response.data.msg); // Thông báo thành công
        fetchDoctors(); // Cập nhật danh sách bác sĩ
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Lỗi không xác định!');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Danh sách bác sĩ</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm bác sĩ theo họ, tên hoặc username..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
      />

      {/* Form thêm bác sĩ mới */}
      <div>
        <h3>Thêm bác sĩ mới</h3>
        <form>
          <div>
            <label>Học hàm:</label>
            <input
              type="text"
              name="hoc_ham"
              value={newDoctor.hoc_ham}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Họ:</label>
            <input
              type="text"
              name="ho"
              value={newDoctor.ho}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Tên:</label>
            <input
              type="text"
              name="ten"
              value={newDoctor.ten}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Hình ảnh (URL):</label>
            <input
              type="text"
              name="hinh_anh"
              value={newDoctor.hinh_anh}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Mô tả:</label>
            <textarea
              name="mo_ta"
              value={newDoctor.mo_ta}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Ngày bắt đầu hành nghề:</label>
            <input
              type="date"
              name="ngay_bd_hanh_y"
              value={newDoctor.ngay_bd_hanh_y}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={newDoctor.username}
              onChange={handleNewDoctorChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newDoctor.password}
              onChange={handleNewDoctorChange}
            />
          </div>
          <button type="button" onClick={handleAddDoctor}>
            Thêm bác sĩ
          </button>
        </form>
      </div>

      {/* Hiển thị danh sách bác sĩ */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Học hàm</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Hình ảnh</th>
            <th>Mô tả</th>
            <th>Ngày bắt đầu hành nghề</th>
            <th>Username</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.hoc_ham}</td>
              <td>{doctor.ho}</td>
              <td>{doctor.ten}</td>
              <td>
                <img
                  src={doctor.hinh_anh}
                  alt={`Hình của ${doctor.ten}`}
                  width="50"
                  height="50"
                />
              </td>
              <td>{doctor.mo_ta}</td>
              <td>{doctor.ngay_bd_hanh_y}</td>
              <td>{doctor.username}</td>
              <td>
                <button onClick={() => handleEditClick(doctor)}>Chỉnh sửa</button>
                <button onClick={() => handleDeleteDoctor(doctor.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form chỉnh sửa bác sĩ */}
      {editDoctor && (
        <div>
          <h3>Chỉnh sửa bác sĩ</h3>
          <form>
            <div>
              <label>Học hàm:</label>
              <input
                type="text"
                name="hoc_ham"
                value={editDoctor.hoc_ham || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Họ:</label>
              <input
                type="text"
                name="ho"
                value={editDoctor.ho || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Tên:</label>
              <input
                type="text"
                name="ten"
                value={editDoctor.ten || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Hình ảnh (URL):</label>
              <input
                type="text"
                name="hinh_anh"
                value={editDoctor.hinh_anh || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Mô tả:</label>
              <textarea
                name="mo_ta"
                value={editDoctor.mo_ta || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Ngày bắt đầu hành nghề:</label>
              <input
                type="date"
                name="ngay_bd_hanh_y"
                value={editDoctor.ngay_bd_hanh_y || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editDoctor.username || ''}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={editDoctor.password || ''}
                onChange={handleEditChange}
              />
            </div>
            <button type="button" onClick={handleEditSave}>
              Lưu thay đổi
            </button>
            <button type="button" onClick={() => setEditDoctor(null)}>
              Hủy
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
