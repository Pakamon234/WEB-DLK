import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointmentsByOffice } from '../services/appointmentService';
import AppointmentListByVanPhong from '../components/AppointmentListByVanPhong';
import { decodeToken } from '../services/authService';
import DoctorLayout from "../components/DoctorLayout"; // Import DoctorLayout
import SearchBar from "../components/SearchBar"; // Import SearchBar

const AppointmentPageVP = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      const decodedToken = decodeToken(token);
      const { userID } = decodedToken.sub; // Doctor's ID

      const data = await getAppointmentsByOffice(userID);
      setAppointments(data.appointments);
      setFilteredAppointments(data.appointments);

      // Extract unique offices from appointments
      const uniqueOffices = [
        ...new Map(
          data.appointments.map((appointment) => [
            appointment.vanphong_id,
            { id: appointment.vanphong_id, name: `Văn phòng ${appointment.vanphong_id}` },
          ])
        ).values(),
      ];
      setOffices(uniqueOffices);
    } catch (error) {
      setErrorMessage(error.message || 'Lỗi khi tải danh sách lịch hẹn.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, selectedDate, selectedOffice);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    applyFilters(searchTerm, date, selectedOffice);
  };

  const handleOfficeChange = (e) => {
    const office = e.target.value;
    setSelectedOffice(office);
    applyFilters(searchTerm, selectedDate, office);
  };

  const applyFilters = (term, date, office) => {
    let filtered = [...appointments];

    if (term) {
      filtered = filtered.filter((appointment) =>
        appointment.user_account_id.toString().includes(term)
      );
    }

    if (date) {
      filtered = filtered.filter(
        (appointment) =>
          new Date(appointment.gio_hen).toISOString().split('T')[0] === date
      );
    }

    if (office) {
      filtered = filtered.filter(
        (appointment) => appointment.vanphong_id.toString() === office
      );
    }

    setFilteredAppointments(filtered);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  return (
    <DoctorLayout>
      <div className="appointment-page">
        <h3>Danh sách lịch hẹn</h3>
        <div className="filters">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ marginRight: '20px', padding: '5px' }}
          />
          <select
            value={selectedOffice}
            onChange={handleOfficeChange}
            style={{ padding: '5px' }}
          >
            <option value="">Chọn văn phòng</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
        <AppointmentListByVanPhong
          appointments={filteredAppointments}
          fetchAppointments={fetchAppointments}
        />
      </div>
    </DoctorLayout>
  );
};

export default AppointmentPageVP;
