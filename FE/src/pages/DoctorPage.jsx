import React, { useEffect, useState, useCallback } from 'react';
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

  // Lấy danh sách bác sĩ từ API
  const fetchDoctors = useCallback(async () => {
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
  }, []);

  const handleImageUpload = async (file, isEditing = false) => {
    if (!file) return;
  
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(imageDb, `doctors/${fileName}`);
  
    try {
      // Upload file lên Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      // Lấy URL của file sau khi upload
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Cập nhật URL hình ảnh vào dữ liệu bác sĩ
      if (isEditing) {
        setDoctorToEdit((prev) => ({ ...prev, hinh_anh: downloadURL }));
      } else {
        setNewDoctor((prev) => ({ ...prev, hinh_anh: downloadURL }));
      }
  
      setSuccessMessage("Upload hình ảnh thành công!");
    } catch (error) {
      setErrorMessage("Lỗi khi upload hình ảnh!");
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };
  // Hàm tìm kiếm bác sĩ
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

  // Hàm hiển thị form chỉnh sửa bác sĩ
  const handleEditClick = (doctor) => {
    if (isEditingDoctor && doctorToEdit?.id === doctor.id) {
      setIsEditingDoctor(false);
      setDoctorToEdit(null);
    } else {
      setDoctorToEdit(doctor);
      setIsEditingDoctor(true);
      setIsAddingDoctor(false);
    }
  };

  // Hàm lưu chỉnh sửa bác sĩ
  const handleEditSave = async () => {
    if (!doctorToEdit.hinh_anh) {
      setErrorMessage("Vui lòng upload hình ảnh trước khi lưu!");
      return;
    }
  
    try {
      const response = await editDoctorAPI(doctorToEdit.id, doctorToEdit);
      setSuccessMessage(response.data.msg);
      setDoctorToEdit(null);
      setIsEditingDoctor(false);
      fetchDoctors();
    } catch (error) {
      setErrorMessage("Lỗi khi lưu thay đổi!");
    }
  };
  
  // Hàm xóa bác sĩ
  const handleDeleteDoctor = async (doctorId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này?");
    if (!confirmDelete) return;
    
    try {
      const response = await deleteDoctor(doctorId);
      setSuccessMessage(response.data.msg);
      fetchDoctors();
    } catch (error) {
      setErrorMessage('Lỗi khi xóa bác sĩ!');
    }
  };

  // Hàm thay đổi dữ liệu bác sĩ mới
  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm thay đổi dữ liệu bác sĩ đang sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setDoctorToEdit((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  // Hàm thêm bác sĩ mới
  const handleAddDoctor = async () => {
    if (!newDoctor.username || !newDoctor.password || !newDoctor.ho || !newDoctor.ten) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin và upload hình ảnh!");
      return;
    }
  
    try {
      const response = await addDoctor(newDoctor);
      setSuccessMessage(response.data.msg);
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
      setIsAddingDoctor(false);
      fetchDoctors();
    } catch (error) {
      setErrorMessage("Lỗi khi thêm bác sĩ!");
    }
  };
  
  // Hàm hủy thêm hoặc chỉnh sửa bác sĩ
  const handleCancelForm = () => {
    setIsAddingDoctor(false);
    setIsEditingDoctor(false);
    setDoctorToEdit(null);
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Danh sách bác sĩ</h2>

      <div className="mb-3">
        <Message message={errorMessage} type="error" />
        <Message message={successMessage} type="success" />
      </div>

      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <SearchBar value={searchTerm} onChange={handleSearch} className="form-control" />
        </div>
        <div className="col-md-4 text-end">
          {!isEditingDoctor && !isAddingDoctor && (
            <button
              onClick={() => {
                setIsAddingDoctor((prev) => !prev);
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

      <DoctorList
        doctors={filteredDoctors}
        onEdit={handleEditClick}
        onDelete={handleDeleteDoctor}
      />

      {(isAddingDoctor || isEditingDoctor) && (
        <DoctorForm
          doctor={doctorToEdit || newDoctor}
          onChange={doctorToEdit ? handleEditChange : handleNewDoctorChange}
          onSave={doctorToEdit ? handleEditSave : handleAddDoctor}
          onCancel={handleCancelForm}
          handleImageUpload={(file) => handleImageUpload(file, !!doctorToEdit)}
          isAddingDoctor={isAddingDoctor}
        />
      )}
    </AdminLayout>
  );
};

export default DoctorPage;
