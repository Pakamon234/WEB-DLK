import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './DoctorList.css'; // Nếu có CSS riêng

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số bác sĩ trên mỗi trang
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Số trang hiển thị tối đa

    if (totalPages <= maxPageNumbers) {
      // Hiển thị tất cả các trang nếu số trang ít hơn maxPageNumbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Hiển thị phân trang với dấu "..."
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) pageNumbers.push(1); // Trang đầu
      if (startPage > 2) pageNumbers.push('...'); // Dấu "..."

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) pageNumbers.push('...'); // Dấu "..."
      if (endPage < totalPages) pageNumbers.push(totalPages); // Trang cuối
    }

    return pageNumbers;
  };

  return (
    <div className="doctor-list-container">
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Học hàm</th>
            <th>Họ</th>
            <th>Tên</th>
            {/* <th>Hình ảnh</th> */}
            <th>Mô tả</th>
            <th>Ngày bắt đầu hành nghề</th>
            <th>Username</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.hoc_ham}</td>
              <td>{doctor.ho}</td>
              <td>{doctor.ten}</td>
              {/* <td>
                <img
                  src={doctor.hinh_anh}
                  alt={`Hình của ${doctor.ten}`}
                  className="doctor-image"
                  width="50"
                  height="50"
                />
              </td> */}
              <td>{doctor.mo_ta}</td>
              <td>{doctor.ngay_bd_hanh_y}</td>
              <td>{doctor.username}</td>
              <td>
                <button
                  onClick={() => onEdit(doctor)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => onDelete(doctor.id)}
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

export default DoctorList;
