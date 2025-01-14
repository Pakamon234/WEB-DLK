import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getOfficeDetails } from '../services/officeService';
import { getUserDetails } from '../services/userService'; // API lấy thông tin người dùng
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentList = ({ appointments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [officeDetails, setOfficeDetails] = useState({}); // Lưu thông tin văn phòng đã tải
  const [userDetails, setUserDetails] = useState({}); // Lưu thông tin người dùng đã tải
  const itemsPerPage = 5; // Số lịch hẹn trên mỗi trang
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchOfficeDetails = async (officeId) => {
    if (officeDetails[officeId]) return; // Nếu thông tin đã được tải, không gọi API lại
    try {
      const details = await getOfficeDetails(officeId);
      setOfficeDetails((prev) => ({ ...prev, [officeId]: details }));
    } catch (error) {
      console.error('Lỗi khi tải thông tin văn phòng:', error.message);
    }
  };

  const fetchUserDetails = async (userId) => {
    if (userDetails[userId]) return; // Nếu thông tin đã được tải, không gọi API lại
    try {
      const details = await getUserDetails(userId);
      setUserDetails((prev) => ({ ...prev, [userId]: details }));
    } catch (error) {
      console.error('Lỗi khi tải thông tin người dùng:', error.message);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case '0':
        return "Đã đặt";
      case '1':
        return "Thành công";
      case '2':
        return "Hủy/Thất bại";
      default:
        return "Không xác định"; // Trường hợp trạng thái không hợp lệ
    }
  };

  const renderUserTooltip = (props, userId) => {
    const details = userDetails[userId];
    return (
      <Tooltip id={`tooltip-user-${userId}`} {...props}>
        {details ? (
          <div>
            <p><strong>Username:</strong> {details.username}</p>
            <p><strong>Họ:</strong> {details.ho}</p>
            <p><strong>Tên:</strong> {details.ten}</p>
            <p><strong>SĐT:</strong> {details.sdt}</p>
            <p><strong>Email:</strong> {details.email}</p>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </Tooltip>
    );
  };

  const renderOfficeTooltip = (props, officeId) => {
    const details = officeDetails[officeId];
    return (
      <Tooltip id={`tooltip-office-${officeId}`} {...props}>
        {details ? (
          <div>
            
            <p><strong>Thời lượng khám:</strong> {details.thoi_luong_kham} phút</p>
            <p><strong>Phí gặp đầu:</strong> {details.phi_gap_dau} VND</p>
            <p><strong>Phí gặp sau:</strong> {details.phi_gap_sau} VND</p>
            <p><strong>Bác sĩ:</strong> {details.bac_si_ten || 'N/A'}</p>
            <p><strong>Bệnh viện:</strong> {details.benh_vien || 'N/A'}</p>
            <p><strong>Địa chỉ:</strong> {details.dia_chi}</p>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </Tooltip>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="appointment-list-container">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>User Account ID</th>
            <th>Giờ hẹn</th>
            <th>Trạng thái</th>
            <th>Ngày giờ đặt</th>
            <th>Kiểu đặt</th>
            <th>Văn phòng ID</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderUserTooltip(props, appointment.user_account_id)}
                  onEnter={() => fetchUserDetails(appointment.user_account_id)} // Tải thông tin người dùng khi hover
                >
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    {appointment.user_account_id}
                  </span>
                </OverlayTrigger>
              </td>
              <td>{appointment.gio_hen || 'N/A'}</td>
              <td>{getStatusText(appointment.trang_thai)}</td>
              <td>{appointment.ngay_gio_dat || 'N/A'}</td>
              <td>{appointment.kieu_dat}</td>
              <td>
                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => renderOfficeTooltip(props, appointment.vanphong_id)}
                  onEnter={() => fetchOfficeDetails(appointment.vanphong_id)} // Tải thông tin văn phòng khi hover
                >
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    {appointment.vanphong_id}
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {renderPageNumbers().map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AppointmentList;
