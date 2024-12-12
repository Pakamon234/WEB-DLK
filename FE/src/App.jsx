// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Trang Login
import AdminPage from './pages/AdminPage';
import UserPage from './UserPage';  // Trang User
import DoctorPage from './pages/DoctorPage';
import PatientPage from './PatientPage';
import HomePage from './pages/HomePage';
function App() {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Route cho Login */}
        <Route path="/" element={<HomePage />} />  {/* Route cho Login */}
        <Route path="/admin" element={<AdminPage />} />  {/* Route cho Admin */}
        <Route path="/user" element={<UserPage />} />  {/* Route cho User */}
        <Route path="/admin/doctors" element={<DoctorPage />} />
        <Route path="/admin/patients" element={<PatientPage />} />
      </Routes>
    
  );
}

export default App;
