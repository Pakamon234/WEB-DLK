import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointmentsByOffice } from '../services/appointmentService';
import AppointmentListByVanPhong from '../components/AppointmentListByVanPhong';
import { decodeToken } from '../services/authService';
import DoctorLayout from "../components/DoctorLayout"; // Import DoctorLayout

const AppointmentPageVP = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Quay lại login nếu không có token
        return;
      }

      const decodedToken = decodeToken(token);
      const { userID } = decodedToken.sub; // ID của bác sĩ đăng nhập

      const data = await getAppointmentsByOffice();
      setAppointments(data.appointments);
    } catch (error) {
      setErrorMessage(error.message || 'Lỗi khi tải danh sách lịch hẹn.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
      <AppointmentListByVanPhong appointments={appointments} fetchAppointments={fetchAppointments}/>
    </div>
    </DoctorLayout>
  );
};

export default AppointmentPageVP;
