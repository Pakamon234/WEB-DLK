import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorById } from '../services/doctorService1';
import DoctorInfo from '../components/DoctorInfo';

const DoctorDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [doctor, setDoctor] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDoctor = async () => {
    try {
      const data = await getDoctorById(id);
      setDoctor(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  return (
    <div>
      <DoctorInfo doctor={doctor} fetchDoctor={fetchDoctor} />
    </div>
  );
};

export default DoctorDetailPage;
