import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, addUser, editUser, deleteUser } from '../services/userService';
import PatientList from '../components/PatientList';
import SearchBar from '../components/SearchBar';
import Message from '../components/Message';
import AdminLayout from '../components/AdminLayout';
import PatientFormModal from '../components/PatientFormModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [patientToEdit, setPatientToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await getAllUsers();
      setPatients(response);
      setFilteredPatients(response);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = patients.filter(
      (patient) =>
        patient.ho.toLowerCase().includes(keyword) ||
        patient.ten.toLowerCase().includes(keyword) ||
        patient.username.toLowerCase().includes(keyword)
    );
    setFilteredPatients(filtered);
  };

  const handleSavePatient = async (patientData) => {
    try {
      if (patientToEdit) {
        await editUser(patientToEdit.id, patientData);
        setSuccessMessage('Chỉnh sửa bệnh nhân thành công!');
      } else {
        await addUser(patientData);
        setSuccessMessage('Thêm bệnh nhân mới thành công!');
      }
      fetchPatients();
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeletePatient = async (patientId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này?');
    if (!confirmDelete) return;

    try {
      await deleteUser(patientId);
      setSuccessMessage('Xóa bệnh nhân thành công!');
      fetchPatients();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditClick = (patient) => {
    setPatientToEdit(patient);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setPatientToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Quản lý bệnh nhân</h2>
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
            Thêm mới bệnh nhân
          </button>
        </div>
      </div>
      <PatientList patients={filteredPatients} onEdit={handleEditClick} onDelete={handleDeletePatient} />
      <PatientFormModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        patient={patientToEdit}
        onSave={handleSavePatient}
      />
    </AdminLayout>
  );
};

export default PatientPage;
