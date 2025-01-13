import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PatientFormModal = ({ show, onHide, patient, onSave }) => {
  const [formData, setFormData] = useState({
    ho: '',
    ten: '',
    sdt: '',
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        ho: '',
        ten: '',
        sdt: '',
        email: '',
        username: '',
        password: '',
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{patient ? 'Chỉnh sửa bệnh nhân' : 'Thêm mới bệnh nhân'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {!patient && (
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
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
      <Modal.Footer>
  <div className="d-flex justify-content-end gap-2 w-100">
    <Button variant="secondary" onClick={onHide}>
      Hủy
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Lưu
    </Button>
  </div>
</Modal.Footer>
    </Modal>
  );
};

export default PatientFormModal;
