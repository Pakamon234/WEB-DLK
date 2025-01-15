import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CTKhoaList = ({ data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Bác sĩ ID</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Khoa ID</th>
            <th>Tên Khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.bacsi_id}</td>
              <td>{item.bacsi_ho || 'N/A'}</td>
              <td>{item.bacsi_ten || 'N/A'}</td>
              <td>{item.khoa_id}</td>
              <td>{item.khoa_ten || 'N/A'}</td>
              <td>
              <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => {
    console.log(item); // Kiểm tra toàn bộ dữ liệu `item`
    onEdit(item);
  }}
>
  Sửa
</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li key={page} className={`page-item ${page + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                {page + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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

export default CTKhoaList;
