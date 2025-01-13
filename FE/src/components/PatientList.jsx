import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
//import './PatientList.css'; // Nếu có CSS riêng

const PatientList = ({ patients, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số bệnh nhân trên mỗi trang
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Số trang hiển thị tối đa

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) pageNumbers.push('...');
      if (endPage < totalPages) pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="patient-list-container">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Tên đăng nhập</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.username}</td>
              <td>{patient.ho}</td>
              <td>{patient.ten}</td>
              <td>{patient.sdt}</td>
              <td>{patient.email}</td>
              <td>
                <button
                  onClick={() => onEdit(patient)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => onDelete(patient.id)}
                  className="btn btn-danger btn-sm"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang nâng cao */}
      <nav>
        <ul className="pagination justify-content-center">
          {/* Nút Previous */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
          </li>

          {/* Số trang */}
          {renderPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${
                page === currentPage ? 'active' : page === '...' ? 'disabled' : ''
              }`}
            >
              {page === '...' ? (
                <span className="page-link">...</span>
              ) : (
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Nút Next */}
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PatientList;
