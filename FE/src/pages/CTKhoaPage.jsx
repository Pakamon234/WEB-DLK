import React, { useState, useEffect, useCallback } from 'react';
import {
  getAllCtKhoa,
  addCtKhoa,
  updateCtKhoa,
  deleteCtKhoa,
} from '../services/ctKhoaService';
import { doctor} from '../services/ctKhoaService'; // Giả sử bạn có các dịch vụ này
import { getAllDepartments} from '../services/departmentService';
import CTKhoaList from '../components/CTKhoaList';
import CTKhoaModal from '../components/CTKhoaModal';
import SearchBar from '../components/SearchBar';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const CTKhoaPage = () => {
  const [ctKhoaList, setCtKhoaList] = useState([]);
  const [filteredCtKhoa, setFilteredCtKhoa] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ctKhoaToEdit, setCtKhoaToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bacsiOptions, setBacsiOptions] = useState([]); // Danh sách bác sĩ
  const [khoaOptions, setKhoaOptions] = useState([]); // Danh sách khoa

  const fetchCtKhoa = useCallback(async () => {
    try {
      const data = await getAllCtKhoa();
      setCtKhoaList(data);
      setFilteredCtKhoa(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const fetchOptions = useCallback(async () => {
    try {
      const [bacsiData, khoaData] = await Promise.all([doctor(), getAllDepartments()]);
      setBacsiOptions(bacsiData);
      setKhoaOptions(khoaData);
    } catch (error) {
      setErrorMessage('Không thể tải danh sách bác sĩ và khoa.');
    }
  }, []);

  useEffect(() => {
    fetchCtKhoa();
    fetchOptions();
  }, [fetchCtKhoa, fetchOptions]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = ctKhoaList.filter(
      (ctKhoa) =>
        ctKhoa.bacsi_ho?.toLowerCase().includes(keyword) ||
        ctKhoa.bacsi_ten?.toLowerCase().includes(keyword) ||
        ctKhoa.khoa_ten?.toLowerCase().includes(keyword)
    );
    setFilteredCtKhoa(filtered);
  };

  const handleSaveCtKhoa = async (ctKhoaData) => {
    try {
      if (ctKhoaToEdit?.id) {
        await updateCtKhoa(ctKhoaToEdit.id, ctKhoaData);
        setSuccessMessage('Cập nhật CT Khoa thành công!');
      } else {
        await addCtKhoa(ctKhoaData);
        setSuccessMessage('Thêm CT Khoa mới thành công!');
      }
      fetchCtKhoa();
      handleModalClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteCtKhoa = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?');
    if (!confirmDelete) return;

    try {
      await deleteCtKhoa(id);
      setSuccessMessage('Xóa CT Khoa thành công!');
      fetchCtKhoa();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditClick = (ctKhoa) => {
    setCtKhoaToEdit(ctKhoa);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setCtKhoaToEdit(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setCtKhoaToEdit(null);
    setIsModalOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Quản lý CT Khoa</h2>
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
            Thêm mới CT Khoa
          </button>
        </div>
      </div>
      <CTKhoaList
        data={filteredCtKhoa}
        onEdit={handleEditClick}
        onDelete={handleDeleteCtKhoa}
      />
      <CTKhoaModal
        show={isModalOpen}
        onHide={handleModalClose}
        ctKhoa={ctKhoaToEdit}
        onSave={handleSaveCtKhoa}
        bacsiOptions={bacsiOptions}
        khoaOptions={khoaOptions}
      />
    </AdminLayout>
  );
};

export default CTKhoaPage;
