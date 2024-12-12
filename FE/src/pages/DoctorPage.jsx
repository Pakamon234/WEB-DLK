import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorForm from '../components/DoctorForm';
import DoctorList from '../components/DoctorList';
import SearchBar from '../components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Message from '../components/Message';
import { fetchDoctorsFromAPI, addDoctor, editDoctor as editDoctorAPI, deleteDoctor } from '../services/doctorService';
import AdminLayout from '../components/AdminLayout';  // Import AdminLayout
import './DoctorPage.css';
const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Thêm state cho thông báo thành công
  const [doctorToEdit, setDoctorToEdit] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    hoc_ham: '',
    ho: '',
    ten: '',
    hinh_anh: '',
    mo_ta: '',
    ngay_bd_hanh_y: '',
    password: '',
    username: '',
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false); // Trạng thái để thêm bác sĩ mới
  const [isEditingDoctor, setIsEditingDoctor] = useState(false); // Trạng thái để chỉnh sửa bác sĩ
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDoctorsFromAPI();
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      setErrorMessage('Lỗi từ server!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = doctors.filter((doctor) => 
      doctor.ho.toLowerCase().includes(keyword) ||
      doctor.ten.toLowerCase().includes(keyword) ||
      doctor.username.toLowerCase().includes(keyword)
    );
    setFilteredDoctors(filtered);
  };

  const handleEditClick = (doctor) => {
    // Kiểm tra nếu form chỉnh sửa đang hiển thị, thì ẩn đi
    if (isEditingDoctor && doctorToEdit?.id === doctor.id) {
      setIsEditingDoctor(false);  // Ẩn form nếu đã có form chỉnh sửa cho bác sĩ này
      setDoctorToEdit(null);
    } else {
      setDoctorToEdit(doctor);  // Hiển thị form chỉnh sửa bác sĩ
      setIsEditingDoctor(true);
      setIsAddingDoctor(false); // Đảm bảo khi chỉnh sửa thì không hiển thị form thêm mới
    }
  };

  const handleEditSave = async () => {
    try {
      if (!doctorToEdit) {
        setErrorMessage('Chưa chọn bác sĩ để sửa!');
        return;
      }
      console.log("Saving doctor:", doctorToEdit);
      const response = await editDoctorAPI(doctorToEdit.id, doctorToEdit);
      setSuccessMessage(response.data.msg); // Thông báo thành công khi lưu
      setDoctorToEdit(null);
      setIsEditingDoctor(false); // Ẩn form chỉnh sửa sau khi lưu
      fetchDoctors();
    } catch (error) {
      setErrorMessage('Lỗi khi lưu thay đổi!');
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
       const response =  await deleteDoctor(doctorId);
       setSuccessMessage(response.data.msg); // Thông báo thành công khi xóa
      fetchDoctors();
    } catch (error) {
      setErrorMessage('Lỗi khi xóa bác sĩ!');
    }
  };

  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setDoctorToEdit((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleAddDoctor = async () => {
    try {
      const response = await addDoctor(newDoctor);

      // Nhận thông báo thành công từ API
      setSuccessMessage(response.data.msg); // Thông báo thành công khi thêm
      setNewDoctor({
        hoc_ham: '',
        ho: '',
        ten: '',
        hinh_anh: '',
        mo_ta: '',
        ngay_bd_hanh_y: '',
        password: '',
        username: '',
      });
      setIsAddingDoctor(false); // Ẩn form sau khi thêm mới thành công
      fetchDoctors();
    } catch (error) {
      setErrorMessage('Lỗi khi thêm bác sĩ!');
    }
  };

  const handleCancelForm = () => {
    setIsAddingDoctor(false);  // Ẩn form khi hủy thêm bác sĩ mới
    setIsEditingDoctor(false);  // Ẩn form khi hủy chỉnh sửa bác sĩ
    setDoctorToEdit(null);  // Đặt lại bác sĩ đang sửa
  };

  return (
<AdminLayout>
      <h2 className="mb-4">Danh sách bác sĩ</h2>

      {/* Hiển thị thông báo lỗi và thông báo thành công */}
      <div className="mb-3">
        <Message message={errorMessage} type="error" />
        <Message message={successMessage} type="success" />
      </div>

      {/* Search bar và nút thêm bác sĩ */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <SearchBar value={searchTerm} onChange={handleSearch} className="form-control" />
        </div>
        <div className="col-md-4 text-end">
          {!isEditingDoctor && !isAddingDoctor && (
            <button 
              onClick={() => { 
                setIsAddingDoctor(prev => !prev);  
                setDoctorToEdit(null);  
              }} 
              className="btn btn-primary"
            >
              {isAddingDoctor ? 'Hủy thêm mới' : 'Thêm mới bác sĩ'}
            </button>
          )}
          {isEditingDoctor && (
            <button onClick={handleCancelForm} className="btn btn-danger ms-2">
              Hủy chỉnh sửa
            </button>
          )}
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <DoctorList 
        doctors={filteredDoctors} 
        onEdit={handleEditClick}  
        onDelete={handleDeleteDoctor} 
      />

      {/* Hiển thị form */}
      {(isAddingDoctor || isEditingDoctor) && (
        <DoctorForm 
          doctor={doctorToEdit || newDoctor}
          onChange={doctorToEdit ? handleEditChange : handleNewDoctorChange}
          onSave={doctorToEdit ? handleEditSave : handleAddDoctor}
          onCancel={handleCancelForm}
          isAddingDoctor={isAddingDoctor}  
        />
      )}
    </AdminLayout>
  );
};

export default DoctorPage;
