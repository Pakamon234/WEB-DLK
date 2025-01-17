import React, { useEffect, useState, useCallback } from "react";
import {
  fetchDoctorsFromAPI,
  addDoctor,
  editDoctor as editDoctorAPI,
  deleteDoctor,
} from "../services/doctorService";
import DoctorFormModal from "../components/DoctorFormModal";
import DoctorList from "../components/DoctorList";
import SearchBar from "../components/SearchBar";
import Message from "../components/Message";
import AdminLayout from "../components/AdminLayout";
import "./DoctorPage.css";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [doctorToEdit, setDoctorToEdit] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    hoc_ham: "",
    ho: "",
    ten: "",
    hinh_anh: "",
    mo_ta: "",
    ngay_bd_hanh_y: "",
    password: "",
    username: "",
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [isEditingDoctor, setIsEditingDoctor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await fetchDoctorsFromAPI();
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      setErrorMessage("Lỗi khi tải danh sách bác sĩ từ server!");
    }
  }, []);

  const handleSaveDoctor = async () => {
    try {
      if (isAddingDoctor) {
        await addDoctor(newDoctor);
        setSuccessMessage("Thêm bác sĩ thành công!");
      } else if (isEditingDoctor && doctorToEdit) {
        await editDoctorAPI(doctorToEdit.id, doctorToEdit);
        setSuccessMessage("Cập nhật thông tin bác sĩ thành công!");
      }
      fetchDoctors();
      handleCloseModal();
    } catch (error) {
      setErrorMessage("Lỗi khi lưu thông tin bác sĩ!");
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
      try {
        await deleteDoctor(doctorId);
        setSuccessMessage("Xóa bác sĩ thành công!");
        fetchDoctors();
      } catch (error) {
        setErrorMessage("Lỗi khi xóa bác sĩ!");
      }
    }
  };

  const handleCloseModal = () => {
    setIsAddingDoctor(false);
    setIsEditingDoctor(false);
    setIsModalOpen(false);
    setDoctorToEdit(null);
    setNewDoctor({
      hoc_ham: "",
      ho: "",
      ten: "",
      hinh_anh: "",
      mo_ta: "",
      ngay_bd_hanh_y: "",
      password: "",
      username: "",
    });
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    setFilteredDoctors(
      doctors.filter(
        (doctor) =>
          doctor.ho.toLowerCase().includes(keyword) ||
          doctor.ten.toLowerCase().includes(keyword) ||
          doctor.username.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Quản lý bác sĩ</h2>
      <div className="mb-3">
        <Message message={errorMessage} type="error" />
        <Message message={successMessage} type="success" />
      </div>
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="col-md-4 text-end">
          <button
            onClick={() => {
              setIsAddingDoctor(true);
              setIsModalOpen(true);
            }}
            className="btn btn-primary"
          >
            Thêm bác sĩ mới
          </button>
        </div>
      </div>
      <DoctorList
        doctors={filteredDoctors}
        onEdit={(doctor) => {
          setDoctorToEdit(doctor);
          setIsEditingDoctor(true);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteDoctor}
      />
      <DoctorFormModal
  show={isModalOpen}
  onHide={handleCloseModal}
  doctor={isAddingDoctor ? newDoctor : doctorToEdit || {}} // Pass empty object if null
  onChange={(e) => {
    const { name, value } = e.target;
    if (isAddingDoctor) {
      setNewDoctor((prev) => ({ ...prev, [name]: value }));
    } else {
      setDoctorToEdit((prev) => ({ ...prev, [name]: value }));
    }
  }}
  onSave={handleSaveDoctor}
  isAddingDoctor={isAddingDoctor}
/>
    </AdminLayout>
  );
};

export default DoctorPage;
