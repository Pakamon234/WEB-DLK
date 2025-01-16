import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const VanPhongModal = ({ show, onHide, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    dia_chi: "",
    thoi_luong_kham: "",
    phi_gap_dau: "",
    phi_gap_sau: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        dia_chi: "",
        thoi_luong_kham: "",
        phi_gap_dau: "",
        phi_gap_sau: "",
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
        <Modal.Title>{initialData ? "Chỉnh sửa Văn Phòng" : "Thêm Văn Phòng"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="dia_chi"
              value={formData.dia_chi}
              onChange={handleChange}
              placeholder="Nhập địa chỉ văn phòng"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thời lượng khám (phút)</Form.Label>
            <Form.Control
              type="number"
              name="thoi_luong_kham"
              value={formData.thoi_luong_kham}
              onChange={handleChange}
              placeholder="Nhập thời lượng khám"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phí khám lần đầu (VND)</Form.Label>
            <Form.Control
              type="number"
              name="phi_gap_dau"
              value={formData.phi_gap_dau}
              onChange={handleChange}
              placeholder="Nhập phí khám lần đầu"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phí khám lại (VND)</Form.Label>
            <Form.Control
              type="number"
              name="phi_gap_sau"
              value={formData.phi_gap_sau}
              onChange={handleChange}
              placeholder="Nhập phí khám lại"
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

export default VanPhongModal;
