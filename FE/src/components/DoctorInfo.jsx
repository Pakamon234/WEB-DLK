import React, { useState } from 'react';
import './DoctorInfo.css'; // Nếu cần CSS tùy chỉnh
import VanPhongModal from "./VanPhongModal"; // Import modal
import HospitalModal from "./HospitalModal"; // Import modal
import CertificateModal from "./CertificateModal"; // Import modal
import ScheduleModal from "./ScheduleModal"; // Import modal
import {
  addVanPhong,
  updateVanPhong,
  deleteVanPhong,
} from "../services/officeService"; // Import officeService
import {
  addLienKetBenhVien,
  updateLienKetBenhVien,
  deleteLienKetBenhVien,
} from "../services/hospitalService"; // Import officeService
import {
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../services/certificateService"; // Đường dẫn tới service
import {
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../services/scheduleService"; // Import service

const DoctorInfo = ({ doctor, fetchDoctor }) => {
  const [activeTab, setActiveTab] = useState("personal"); // Tab mặc định là Thông tin cá nhân
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
  const [editingOffice, setEditingOffice] = useState(null);
  const [editingHospital, setEditingHospital] = useState(null); // Modal Bệnh viện
  const [vanPhongs, setVanPhongs] = useState(doctor.vanphongs || []);
  const [benhviens, setBenhViens] = useState(doctor.lienketbenhvien || []);
  const [certificateModalVisible, setCertificateModalVisible] = useState(false); // Hiển thị modal
  const [editingCertificate, setEditingCertificate] = useState(null); // Bằng cấp đang được sửa
  const [certificates, setCertificates] = useState(doctor.bangcap_chungchi || []); // Danh sách bằng cấp


  if (!doctor) {
    return <div>Không có thông tin bác sĩ.</div>;
  }

  const handleOpenModal = (office) => {
    setEditingOffice(office);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditingOffice(null);
    setModalVisible(false);
  };

  // Mở modal bệnh viện
  const handleOpenHospitalModal = (hospital) => {
    setEditingHospital(hospital);
    setModalVisible(true);
  };

  // Đóng modal bệnh viện
  const handleCloseHospitalModal = () => {
    setEditingHospital(null);
    setModalVisible(false);
  };
  // Mở modal thêm hoặc sửa bằng cấp
  const handleOpenCertificateModal = (certificate) => {
    setEditingCertificate(certificate);
    setCertificateModalVisible(true);
  };

  // Đóng modal
  const handleCloseCertificateModal = () => {
    setEditingCertificate(null);
    setCertificateModalVisible(false);
  };

  const handleSaveOffice = async (data) => {
    try {
      if (editingOffice) {
        // Cập nhật văn phòng
        const updatedOffice = await updateVanPhong(editingOffice.id, data);
        setVanPhongs((prev) =>
          prev.map((vp) => (vp.id === editingOffice.id ? updatedOffice : vp))
        );
      } else {
        // Thêm mới văn phòng
        const newOffice = await addVanPhong({ ...data, bac_si_id: doctor.id });
        setVanPhongs((prev) => [...prev, newOffice]);
      }
      fetchDoctor(); // Làm mới dữ liệu từ server
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi lưu văn phòng:", error.message);
    }
  };
  const handleDeleteOffice = async (officeId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa văn phòng này?");
    if (!confirmDelete) return;

    try {
      await deleteVanPhong(officeId);
      setVanPhongs((prev) => prev.filter((vp) => vp.id !== officeId));
      fetchDoctor(); // Làm mới dữ liệu từ server
    } catch (error) {
      console.error("Lỗi khi xóa văn phòng:", error.message);
    }

  };
  // Lưu Bệnh viện
  const handleSaveHospital = async (data) => {
    try {
      if (editingHospital) {
        await updateLienKetBenhVien(editingHospital.id, data);
      } else {
        const newHospital = await addLienKetBenhVien({
          ...data,
          bac_si_id: doctor.id,
        });
        setBenhViens((prev) => [...prev, newHospital]);
      }
      fetchDoctor(); // Làm mới dữ liệu từ server
      handleCloseHospitalModal();
    } catch (error) {
      console.error("Lỗi khi lưu liên kết bệnh viện:", error.message);
    }
  };

  // Xóa Bệnh viện
  const handleDeleteHospital = async (hospitalId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa liên kết bệnh viện này?")) {
      try {
        await deleteLienKetBenhVien(hospitalId);
        fetchDoctor(); // Làm mới dữ liệu từ server
      } catch (error) {
        console.error("Lỗi khi xóa liên kết bệnh viện:", error.message);
      }
    }
  };
  const handleSaveCertificate = async (data) => {
    try {
      if (editingCertificate) {
        // Cập nhật bằng cấp
        await updateCertificate(editingCertificate.id, data);
        setCertificates((prev) =>
          prev.map((cert) => (cert.id === editingCertificate.id ? { ...cert, ...data } : cert))
        );
      } else {
        // Thêm mới bằng cấp
        const newCertificate = await addCertificate({ ...data, bacsi_id: doctor.id });
        setCertificates((prev) => [...prev, newCertificate]);
      }
      fetchDoctor(); // Làm mới dữ liệu từ server
      handleCloseCertificateModal();
    } catch (error) {
      console.error("Lỗi khi lưu bằng cấp/chứng chỉ:", error.message);
    }
  };
  const handleDeleteCertificate = async (certificateId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bằng cấp/chứng chỉ này?")) {
      try {
        await deleteCertificate(certificateId);
        setCertificates((prev) => prev.filter((cert) => cert.id !== certificateId));
        fetchDoctor(); // Làm mới dữ liệu từ server
      } catch (error) {
        console.error("Lỗi khi xóa bằng cấp/chứng chỉ:", error.message);
      }
    }
  };
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  // Mở modal
  const handleOpenScheduleModal = (schedule, vanPhongId) => {
    setEditingSchedule(schedule ? { ...schedule, vanPhongId } : { vanPhongId });
    setScheduleModalVisible(true);
  };


  // Đóng modal
  const handleCloseScheduleModal = () => {
    setEditingSchedule(null);
    setScheduleModalVisible(false);
  };
  // Lưu lịch trình
  const handleSaveSchedule = async (data) => {
    try {
      if (editingSchedule.id) {
        // Sửa lịch trình
        await updateSchedule(editingSchedule.id, data);
      } else {
        // Thêm mới lịch trình với vanPhong_id
        await addSchedule({ ...data, vanPhong_id: editingSchedule.vanPhongId });
      }
      fetchDoctor(); // Làm mới dữ liệu từ server
      handleCloseScheduleModal();
    } catch (error) {
      console.error("Lỗi khi lưu lịch trình:", error.message);
    }
  };


  // Xóa lịch trình
  const handleDeleteSchedule = async (scheduleId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch trình này?")) {
      try {
        await deleteSchedule(scheduleId);
        fetchDoctor(); // Làm mới dữ liệu từ server
      } catch (error) {
        console.error("Lỗi khi xóa lịch trình:", error.message);
      }
    }
  };


  return (
    <div className="container mt-5">
      <div className="row">
        {/* Thông tin cơ bản */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <img
                src={doctor.hinh_anh || 'https://via.placeholder.com/450'}
                alt="Doctor"
                className="rounded-circle mb-3"
              />
              <h4>{`${doctor.ho} ${doctor.ten}`}</h4>
              <p className="text-muted">{doctor.hoc_ham}</p>
              <p>ID: {doctor.id}</p>
              <button className="btn btn-outline-primary">Nhắn tin</button>
            </div>
          </div>
        </div>

        {/* Tabs và Nội dung */}
        <div className="col-md-8">
          {/* Tabs Menu */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                Thông tin cá nhân
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'office' ? 'active' : ''}`}
                onClick={() => setActiveTab('office')}
              >
                Văn phòng
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'hospital' ? 'active' : ''}`}
                onClick={() => setActiveTab('hospital')}
              >
                Bệnh viện liên kết
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'certificate' ? 'active' : ''}`}
                onClick={() => setActiveTab('certificate')}
              >
                Bằng cấp/Chứng chỉ
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                Lịch trình
              </button>
            </li>
          </ul>

          {/* Nội dung các tab */}
          <div className="tab-content mt-3">
            {activeTab === 'personal' && (
              <div>
                <h5>Thông tin cá nhân</h5>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Họ và Tên:</strong> {`${doctor.ho} ${doctor.ten}`}</p>
                        <p><strong>Ngày bắt đầu hành nghề:</strong> {doctor.ngay_bd_hanh_y || 'Không có thông tin'}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>ID:</strong> {doctor.id}</p>
                        <p><strong>Mô tả:</strong> {doctor.mo_ta || 'Không có mô tả.'}</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-success me-2">Chỉnh sửa</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "office" && (
              <div className="tab-content mt-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Văn phòng</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenModal(null)}
                  >
                    Thêm Văn Phòng
                  </button>
                </div>
                <div className="row">
                  {vanPhongs.length > 0 ? (
                    vanPhongs.map((vp) => (
                      <div className="col-md-6 mb-4" key={`office-${vp.id}`}>
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <h6 className="card-title">
                              <strong>Địa chỉ:</strong> {vp.dia_chi || "Không có thông tin"}
                            </h6>
                            <p className="card-text">
                              <strong>Thời lượng khám:</strong> {vp.thoi_luong_kham || 0} phút<br />
                              <strong>Phí khám lần đầu:</strong> {(vp.phi_gap_dau ?? 0).toLocaleString()} VND<br />
                              <strong>Phí khám lại:</strong> {(vp.phi_gap_sau ?? 0).toLocaleString()} VND
                            </p>
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleOpenModal(vp)}
                              >
                                Sửa
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteOffice(vp.id)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Không có thông tin văn phòng.</p>
                  )}
                </div>
                {/* Modal */}
                <VanPhongModal
                  show={modalVisible}
                  onHide={handleCloseModal}
                  onSave={handleSaveOffice}
                  initialData={editingOffice}
                />
              </div>
            )}

            {activeTab === 'hospital' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Bệnh viện liên kết</h5>
                  <button
                    className="btn btn-primary mb-3"
                    onClick={() => handleOpenHospitalModal(null)}
                  >
                    Thêm Bệnh viện
                  </button>
                </div>
                <div className="row">
                  {doctor.lienketbenhvien.length > 0 ? (
                    doctor.lienketbenhvien.map((hospital) => (
                      <div className="col-md-6 mb-4" key={`hospital-${hospital.id}`}>
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <h6 className="card-title">{hospital.ten_benh_vien}</h6>
                            <p>
                              <strong>Địa chỉ:</strong> {hospital.dia_chi} <br />
                              <strong>Ngày bắt đầu:</strong> {hospital.ngay_db} <br />
                              <strong>Ngày kết thúc:</strong> {hospital.ngay_kt || 'Đang hoạt động'}
                            </p>
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleOpenHospitalModal(hospital)}
                              >
                                Sửa
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteHospital(hospital.id)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Không có thông tin bệnh viện liên kết.</p>
                  )}
                </div>
                <HospitalModal
                  show={modalVisible}
                  onHide={handleCloseHospitalModal}
                  onSave={handleSaveHospital}
                  initialData={editingHospital}
                />
              </div>
            )}
            {activeTab === "certificate" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Bằng cấp/Chứng chỉ</h5>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenCertificateModal(null)}
                  >
                    Thêm Bằng cấp/Chứng chỉ
                  </button>
                </div>
                <div className="row">
                  {certificates.map((certificate) => (
                    <div className="col-md-6 mb-4" key={`certificate-${certificate.id}`}>
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h6 className="card-title">{certificate.ten_bangcap}</h6>
                          <p>
                            <strong>Cơ quan cấp:</strong> {certificate.co_quan_cap || "Không có thông tin"} <br />
                            <strong>Ngày cấp:</strong> {certificate.ngay_cap}
                          </p>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleOpenCertificateModal(certificate)}
                            >
                              Sửa
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteCertificate(certificate.id)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal quản lý bằng cấp */}
                <CertificateModal
                  show={certificateModalVisible}
                  onHide={handleCloseCertificateModal}
                  onSave={handleSaveCertificate}
                  initialData={editingCertificate}
                />
              </div>
            )}




            {activeTab === "schedule" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Lịch trình</h5>

                </div>
                <div className="row">
                  {doctor.vanphongs.map((vp) => (
                    <div className="col-md-6 mb-4" key={`office-${vp.id}`}>
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h6 className="card-title">
                            <strong>Địa chỉ văn phòng:</strong> {vp.dia_chi}
                          </h6>
                          <button
                            className="btn btn-primary btn-sm mb-2"
                            onClick={() => handleOpenScheduleModal(null, vp.id)}
                          >
                            Thêm Lịch trình
                          </button>
                          <ul className="list-unstyled">
                            {vp.lichtrinhs.map((lt) => (
                              <li key={`schedule-${lt.id}`}>
                                <strong>{lt.day_of_week}:</strong> {lt.gio_bd} - {lt.gio_kt}{" "}
                                {lt.vang && <span>(Vắng: {lt.ly_do})</span>}
                                <div className="d-flex justify-content-end mt-2">
                                  <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleOpenScheduleModal(lt, vp.id)}
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteSchedule(lt.id)}
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                {/* Modal */}
                <ScheduleModal
                  show={scheduleModalVisible}
                  onHide={handleCloseScheduleModal}
                  onSave={handleSaveSchedule}
                  initialData={editingSchedule}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
