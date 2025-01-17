import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { updateAppointmentStatus } from "../services/appointmentService"; // Import the status update service
import "bootstrap/dist/css/bootstrap.min.css";
import { getOfficeDetails } from "../services/officeService";
import { getUserDetails } from "../services/userService"; // API to fetch user details

const AppointmentListByVP = ({ appointments, fetchAppointments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [officeDetails, setOfficeDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const itemsPerPage = 5; // Number of appointments per page
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const currentAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchOfficeDetails = async (officeId) => {
    if (officeDetails[officeId]) return;
    try {
      const details = await getOfficeDetails(officeId);
      setOfficeDetails((prev) => ({ ...prev, [officeId]: details }));
    } catch (error) {
      console.error("Error fetching office details:", error.message);
    }
  };

  const fetchUserDetails = async (userId) => {
    if (userDetails[userId]) return;
    try {
      const details = await getUserDetails(userId);
      setUserDetails((prev) => ({ ...prev, [userId]: details }));
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "0":
        return "Đã đặt";
      case "1":
        return "Thành công";
      case "2":
        return "Hủy/Thất bại";
      default:
        return "Không xác định";
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    if (!window.confirm("Bạn có chắc chắn muốn cập nhật trạng thái?")) return;

    try {
      await updateAppointmentStatus(appointmentId, newStatus); // Call the service to update the status
      alert("Cập nhật trạng thái thành công!");
      fetchAppointments(); // Refresh the list after updating
    } catch (error) {
      alert(error.message);
    }
  };

  const renderUserTooltip = (props, userId) => (
    <Tooltip id={`tooltip-user-${userId}`} {...props}>
      {userDetails[userId] ? (
        <div>
          <p><strong>Họ:</strong> {userDetails[userId].ho}</p>
          <p><strong>Tên:</strong> {userDetails[userId].ten}</p>
          <p><strong>SĐT:</strong> {userDetails[userId].sdt}</p>
          <p><strong>Email:</strong> {userDetails[userId].email}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </Tooltip>
  );

  const renderOfficeTooltip = (props, officeId) => (
    <Tooltip id={`tooltip-office-${officeId}`} {...props}>
      {officeDetails[officeId] ? (
        <div>
          <p><strong>Thời lượng khám:</strong> {officeDetails[officeId].thoi_luong_kham} phút</p>
          <p><strong>Phí lần đầu:</strong> {officeDetails[officeId].phi_gap_dau} VND</p>
          <p><strong>Phí tái khám:</strong> {officeDetails[officeId].phi_gap_sau} VND</p>
          <p><strong>Địa chỉ:</strong> {officeDetails[officeId].dia_chi}</p>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </Tooltip>
  );

  return (
    <div className="appointment-list-container">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Người đặt</th>
            <th>Giờ hẹn</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
            <th>Ngày đặt</th>
            <th>Văn phòng</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>
                <OverlayTrigger
                  placement="right"
                  overlay={(props) =>
                    renderUserTooltip(props, appointment.user_account_id)
                  }
                  onEnter={() => fetchUserDetails(appointment.user_account_id)}
                >
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {appointment.user_account_id}
                  </span>
                </OverlayTrigger>
              </td>
              <td>{appointment.gio_hen || "N/A"}</td>
              <td>{getStatusText(appointment.trang_thai)}</td>
              <td>
                {appointment.trang_thai !== "1" && (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleStatusUpdate(appointment.id, "1")}
                  >
                    Thành công
                  </button>
                )}
                {appointment.trang_thai !== "2" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleStatusUpdate(appointment.id, "2")}
                  >
                    Hủy
                  </button>
                )}
              </td>
              <td>{appointment.ngay_gio_dat || "N/A"}</td>
              <td>
                <OverlayTrigger
                  placement="left"
                  overlay={(props) =>
                    renderOfficeTooltip(props, appointment.vanphong_id)
                  }
                  onEnter={() => fetchOfficeDetails(appointment.vanphong_id)}
                >
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {appointment.dia_chi}
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
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

export default AppointmentListByVP;
