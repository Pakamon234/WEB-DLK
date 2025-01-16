import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const HospitalModal = ({ show, onHide, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    ten_benh_vien: "",
    dia_chi: "",
    ngay_db: "",
    ngay_kt: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ten_benh_vien: initialData.ten_benh_vien || "",
        dia_chi: initialData.dia_chi || "",
        ngay_db: initialData.ngay_db || "",
        ngay_kt: initialData.ngay_kt || "",
      });
    } else {
      setFormData({
        ten_benh_vien: "",
        dia_chi: "",
        ngay_db: "",
        ngay_kt: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Chỉnh sửa liên kết bệnh viện" : "Thêm liên kết bệnh viện"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên bệnh viện</Form.Label>
            <Form.Control
              type="text"
              name="ten_benh_vien"
              value={formData.ten_benh_vien}
              onChange={handleChange}
              placeholder="Nhập tên bệnh viện"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="dia_chi"
              value={formData.dia_chi}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date"
              name="ngay_db"
              value={formData.ngay_db}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày kết thúc (nếu có)</Form.Label>
            <Form.Control
              type="date"
              name="ngay_kt"
              value={formData.ngay_kt}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
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

export default HospitalModal;
