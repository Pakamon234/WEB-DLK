import React from 'react';
import './DoctorForm.css';  // Thêm class CSS vào form

const DoctorForm = ({ doctor, onChange, onSave, onCancel, isAddingDoctor }) => {
  return (
    <div className="doctor-form-container">
      <h3>{isAddingDoctor ? 'Thêm bác sĩ mới' : 'Chỉnh sửa bác sĩ'}</h3>
      <form className="doctor-form">
        <div className="form-group">
          <label>Học hàm:</label>
          <input
            type="text"
            name="hoc_ham"
            value={doctor?.hoc_ham || ''}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Họ:</label>
          <input
            type="text"
            name="ho"
            value={doctor?.ho || ''}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            name="ten"
            value={doctor?.ten || ''}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Hình ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Mô tả:</label>
          <textarea
            name="mo_ta"
            value={doctor?.mo_ta || ''}
            onChange={onChange}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Ngày bắt đầu hành nghề:</label>
          <input
            type="date"
            name="ngay_bd_hanh_y"
            value={doctor?.ngay_bd_hanh_y || ''}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={doctor?.username || ''}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={doctor?.password || ''}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onSave} className="btn save-btn">
            {isAddingDoctor ? 'Thêm bác sĩ' : 'Lưu thay đổi'}
          </button>
          <button type="button" onClick={onCancel} className="btn cancel-btn">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
