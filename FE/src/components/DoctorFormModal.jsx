import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DoctorFormModal = ({ show, onHide, doctor, onSave, handleImageUpload }) => {
  const [formData, setFormData] = useState({
    hoc_ham: '',
    ho: '',
    ten: '',
    hinh_anh: '',
    mo_ta: '',
    ngay_bd_hanh_y: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    } else {
      setFormData({
        hoc_ham: '',
        ho: '',
        ten: '',
        hinh_anh: '',
        mo_ta: '',
        ngay_bd_hanh_y: '',
        username: '',
        password: '',
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{doctor ? 'Chỉnh sửa bác sĩ' : 'Thêm bác sĩ mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Học hàm</Form.Label>
            <Form.Control
              type="text"
              name="hoc_ham"
              value={formData.hoc_ham}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Họ</Form.Label>
            <Form.Control
              type="text"
              name="ho"
              value={formData.ho}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="ten"
              value={formData.ten}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              name="mo_ta"
              value={formData.mo_ta}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu hành nghề</Form.Label>
            <Form.Control
              type="date"
              name="ngay_bd_hanh_y"
              value={formData.ngay_bd_hanh_y}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {!doctor && (
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorFormModal;
