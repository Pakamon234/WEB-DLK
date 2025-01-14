// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route,useLocation  } from 'react-router-dom';
import Login from './pages/Login'; // Trang Login
import AdminPage from './pages/AdminPage';
import UserPage from './UserPage';  // Trang User
import DoctorPage from './pages/DoctorPage';
import PatientPage from './pages/PatientPage'; // Đường dẫn đến file PatientPage
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AppointmentPage from './pages/AppointmentPage';
import 'bootstrap/dist/css/bootstrap.min.css';
//import UserList from './components/UserList';

function App() {

  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Route cho Login */}
        <Route path="/" element={<HomePage />} />  {/* Route cho Login */}
        <Route path="/admin" element={<AdminPage />} />  {/* Route cho Admin */}
        <Route path="/user" element={<UserPage />} />  {/* Route cho User */}
        <Route path="/admin/doctors" element={<DoctorPage />} />
        <Route path="/admin/patients" element={<PatientPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/appointments" element={<AppointmentPage />} />
        {/* <Route path="/userlist" element={<UserList />} /> */}
      </Routes>
    
  );
}

export default App;
