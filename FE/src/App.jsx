// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';  // Trang Login
import AdminPage from './AdminPage';  // Trang Admin
import UserPage from './UserPage';  // Trang User
import DoctorPage from './DoctorPage';
import PatientPage from './PatientPage';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />  {/* Route cho Login */}
        <Route path="/admin" element={<AdminPage />} />  {/* Route cho Admin */}
        <Route path="/user" element={<UserPage />} />  {/* Route cho User */}
        <Route path="/admin/doctors" element={<DoctorPage />} />
        <Route path="/admin/patients" element={<PatientPage />} />
      </Routes>
    
  );
}

export default App;
