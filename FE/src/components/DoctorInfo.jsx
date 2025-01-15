import React, { useState } from 'react';
import './DoctorInfo.css'; // Nếu cần CSS tùy chỉnh

const DoctorInfo = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState('personal'); // Tab mặc định là "Thông tin cá nhân"

  if (!doctor) {
    return <div>Không có thông tin bác sĩ.</div>;
  }

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
              <button className="btn btn-primary me-2">Theo dõi</button>
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
            {activeTab === 'office' && (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5>Văn phòng</h5>
      <button className="btn btn-primary" onClick={() => console.log('Thêm văn phòng')}>
        Thêm Văn Phòng
      </button>
    </div>
    <div className="row">
      {doctor.vanphongs.length > 0 ? (
        doctor.vanphongs.map((vp) => (
          <div className="col-md-6 mb-4" key={vp.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title"><strong>Địa chỉ:</strong> {vp.dia_chi}</h6>
                <p className="card-text">
                  <strong>Thời lượng khám:</strong> {vp.thoi_luong_kham} phút<br />
                  <strong>Phí khám lần đầu:</strong> {vp.phi_gap_dau.toLocaleString()} VND<br />
                  <strong>Phí khám lại:</strong> {vp.phi_gap_sau.toLocaleString()} VND
                </p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => console.log(`Sửa văn phòng ${vp.id}`)}>
                    Sửa
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => console.log(`Xóa văn phòng ${vp.id}`)}>
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
  </div>
)}

{activeTab === 'hospital' && (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5>Bệnh viện liên kết</h5>
      <button className="btn btn-primary" onClick={() => console.log('Thêm bệnh viện')}>
        Thêm Bệnh viện
      </button>
    </div>
    <div className="row">
      {doctor.lienketbenhvien.length > 0 ? (
        doctor.lienketbenhvien.map((bv) => (
          <div className="col-md-6 mb-4" key={bv.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title"><strong>{bv.ten_benh_vien}</strong></h6>
                <p className="card-text">
                  <strong>Địa chỉ:</strong> {bv.dia_chi}<br />
                  <strong>Thời gian:</strong> {bv.ngay_db} đến {bv.ngay_kt || 'Hiện tại'}
                </p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => console.log(`Sửa bệnh viện ${bv.id}`)}>
                    Sửa
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => console.log(`Xóa bệnh viện ${bv.id}`)}>
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
  </div>
)}
{activeTab === 'certificate' && (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5>Bằng cấp/Chứng chỉ</h5>
      <button className="btn btn-primary" onClick={() => console.log('Thêm chứng chỉ')}>
        Thêm Bằng cấp/Chứng chỉ
      </button>
    </div>
    <div className="row">
      {doctor.bangcap_chungchi.length > 0 ? (
        doctor.bangcap_chungchi.map((bc) => (
          <div className="col-md-6 mb-4" key={bc.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title"><strong>{bc.ten_bangcap}</strong></h6>
                <p className="card-text">
                  <strong>Cơ quan cấp:</strong> {bc.co_quan_cap || 'Không có thông tin'}<br />
                  <strong>Ngày cấp:</strong> {bc.ngay_cap}
                </p>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => console.log(`Sửa chứng chỉ ${bc.id}`)}>
                    Sửa
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => console.log(`Xóa chứng chỉ ${bc.id}`)}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Không có bằng cấp hoặc chứng chỉ.</p>
      )}
    </div>
  </div>
)}

  
{activeTab === 'schedule' && (
  <div>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5>Lịch trình</h5>
      <button className="btn btn-primary" onClick={() => console.log('Thêm lịch trình')}>
        Thêm Lịch trình
      </button>
    </div>
    <div className="row">
      {doctor.vanphongs.length > 0 ? (
        doctor.vanphongs.map((vp) => (
          <div className="col-md-6 mb-4" key={vp.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title"><strong>Địa chỉ văn phòng:</strong> {vp.dia_chi}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Lịch làm việc:</h6>
                <ul className="list-unstyled">
                  {vp.lichtrinhs.map((lt) => (
                    <li key={lt.id}>
                      <strong>{lt.day_of_week}:</strong> {lt.gio_bd} - {lt.gio_kt} 
                      {lt.vang && <span> (Vắng: {lt.ly_do})</span>}
                      <div className="d-flex justify-content-end mt-2">
                        <button className="btn btn-warning btn-sm me-2" onClick={() => console.log(`Sửa lịch trình ${lt.id}`)}>
                          Sửa
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => console.log(`Xóa lịch trình ${lt.id}`)}>
                          Xóa
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Không có lịch trình.</p>
      )}
    </div>
  </div>
)}

  
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
