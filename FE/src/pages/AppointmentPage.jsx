import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '../services/appointmentService';
import AppointmentList from '../components/AppointmentList';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import AdminLayout from '../components/AdminLayout';
import FilterComponent from '../components/FilterComponent'; // Đúng tên component

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterOffice, setFilterOffice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    filterAppointments(keyword, filterDate, filterType, filterOffice);
  };

  const handleFilterDate = (e) => {
    const date = e.target.value;
    setFilterDate(date);
    filterAppointments(searchTerm, date, filterType, filterOffice);
  };

  const handleFilterType = (type) => {
    setFilterType(type);
    filterAppointments(searchTerm, filterDate, type, filterOffice);
  };

  const handleFilterOffice = (e) => {
    const office = e.target.value;
    setFilterOffice(office);
    filterAppointments(searchTerm, filterDate, filterType, office);
  };

  const filterAppointments = (keyword, date, type, office) => {
    let filtered = appointments;
  
    // Tìm kiếm theo từ khóa
    if (keyword) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.user_account_id.toString().includes(keyword) ||
          appointment.trang_thai.toLowerCase().includes(keyword) ||
          appointment.kieu_dat.toLowerCase().includes(keyword) // So sánh tên kiểu đặt
      );
    }
  
    // Lọc theo ngày
    if (date) {
      filtered = filtered.filter(
        (appointment) => appointment.ngay_gio_dat && appointment.ngay_gio_dat.startsWith(date)
      );
    }
  
    // Lọc theo kiểu đặt
    if (type) {
      filtered = filtered.filter((appointment) => appointment.kieu_dat.toLowerCase() === type.toLowerCase());
    }
  
    // Lọc theo văn phòng
    if (office) {
      filtered = filtered.filter((appointment) => appointment.vanphong_id.toString() === office);
    }
  
    setFilteredAppointments(filtered);
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Danh sách lịch hẹn</h2>
      <div className="mb-3">
        <Message message={errorMessage} type="error" />
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            placeholder="Tìm kiếm theo User ID, trạng thái, kiểu đặt..."
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={handleFilterDate}
            placeholder="Lọc theo ngày"
          />
        </div>
        <div className="col-md-3">
          {/* FilterComponent cho kiểu đặt */}
          <FilterComponent selectedType={filterType} onTypeChange={handleFilterType} />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            value={filterOffice}
            onChange={handleFilterOffice}
            placeholder="Lọc theo văn phòng"
          />
        </div>
      </div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <AppointmentList appointments={filteredAppointments} />
      )}
    </AdminLayout>
  );
};

export default AppointmentPage;
