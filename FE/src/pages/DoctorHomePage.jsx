import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../services/authService";
import { getDoctorById } from "../services/doctorService1";
import DoctorInfo from "../components/DoctorInfo";
import DoctorLayout from "../components/DoctorLayout"; // Import DoctorLayout

const DoctorHomePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDoctor = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Quay lại login nếu không có token
        return;
      }

      const decodedToken = decodeToken(token);
      const { userID } = decodedToken.sub;

      const data = await getDoctorById(userID);
      setDoctor(data);
    } catch (error) {
      setErrorMessage("Lỗi khi tải thông tin bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  return (
    <DoctorLayout>
      <DoctorInfo doctor={doctor} fetchDoctor={fetchDoctor} />
    </DoctorLayout>
  );
};

export default DoctorHomePage;
