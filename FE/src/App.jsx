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
import DepartmentPage from './pages/DepartmentPage';
import CTKhoaPage from './pages/CTKhoaPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorDetailPage from './pages/DoctorDetailPage';
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
//import UserList from './components/UserList';
import DoctorHomePage from './pages/DoctorHomePage'; // Import trang DoctorPage

function App() {

  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Route cho Login */}
        <Route path="/" element={<HomePage />} />  {/* Route cho Login */}     
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <PrivateRoute roleRequired="admin">
              <DoctorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <PrivateRoute roleRequired="admin">
              <PatientPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <PrivateRoute roleRequired="admin">
              <AppointmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/department"
          element={
            <PrivateRoute roleRequired="admin">
              <DepartmentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/ct-khoa"
          element={
            <PrivateRoute roleRequired="admin">
              <CTKhoaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/doctors/:id"
          element={
            <PrivateRoute roleRequired="admin">
              <DoctorDetailPage />
            </PrivateRoute>
          }
        />

<Route path="/doctor" element={<DoctorHomePage />} /> {/* Route cho Doctor */}
        {/* <Route path="/userlist" element={<UserList />} /> */}
      </Routes>


    
  );
}

export default App;
