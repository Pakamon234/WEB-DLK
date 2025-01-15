import React, { useState, useEffect, useCallback } from 'react';
import { getAllDepartments, addDepartment, editDepartment, deleteDepartment } from '../services/departmentService';
import DepartmentList from '../components/DepartmentList';
import SearchBar from '../components/SearchBar';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import DepartmentModal from '../components/DepartmentModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [departmentToEdit, setDepartmentToEdit] = useState({ ten_khoa: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDepartments = useCallback(async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
      setFilteredDepartments(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = departments.filter((department) =>
      department.ten_khoa.toLowerCase().includes(keyword)
    );
    setFilteredDepartments(filtered);
  };

  const handleSaveDepartment = async (departmentData) => {
    if (!departmentData.ten_khoa.trim()) {
      setErrorMessage('Tên khoa không được để trống.');
      return;
    }
    try {
      if (departmentToEdit?.id) {
        await editDepartment(departmentToEdit.id, departmentData);
        setSuccessMessage('Chỉnh sửa khoa thành công!');
      } else {
        await addDepartment(departmentData);
        setSuccessMessage('Thêm khoa mới thành công!');
      }
      fetchDepartments();
      handleModalClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa khoa này?');
    if (!confirmDelete) return;

    try {
      await deleteDepartment(departmentId);
      setSuccessMessage('Xóa khoa thành công!');
      fetchDepartments();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditClick = (department) => {
    setDepartmentToEdit(department);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setDepartmentToEdit({ ten_khoa: '' });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentToEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setDepartmentToEdit({ ten_khoa: '' });
    setIsModalOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Quản lý Khoa</h2>
      <div className="mb-3">
        <Message message={errorMessage} type="error" />
        <Message message={successMessage} type="success" />
      </div>
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <SearchBar value={searchTerm} onChange={handleSearch} className="form-control" />
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddClick}>
            Thêm mới Khoa
          </button>
        </div>
      </div>
      <DepartmentList
        departments={filteredDepartments}
        onEdit={handleEditClick}
        onDelete={handleDeleteDepartment}
      />
      <DepartmentModal
        show={isModalOpen}
        onHide={handleModalClose}
        department={departmentToEdit}
        onSave={handleSaveDepartment}
        onChange={handleInputChange}
      />
    </AdminLayout>
  );
};

export default DepartmentPage;
