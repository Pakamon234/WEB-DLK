import React, { useState } from 'react';
import './DepartmentList.css'; // Import CSS riêng cho bảng

const DepartmentList = ({ departments, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng khoa hiển thị trên mỗi trang

  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDepartments = departments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div>
      <table id="department-table">
        <thead>
          <tr>
            <th style={{ width: '10%' }}>ID</th>
            <th style={{ width: '70%' }}>Tên Khoa</th>
            <th style={{ width: '20%' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentDepartments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.ten_khoa}</td>
              <td>
                <button
                  onClick={() => onEdit(department)}
                  className="action-btn edit-btn"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(department.id)}
                  className="action-btn delete-btn"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Phân trang */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
          </li>
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
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
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

export default DepartmentList;
