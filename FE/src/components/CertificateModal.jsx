import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CertificateModal = ({ show, onHide, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    ten_bangcap: "",
    co_quan_cap: "",
    ngay_cap: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ten_bangcap: initialData.ten_bangcap || "",
        co_quan_cap: initialData.co_quan_cap || "",
        ngay_cap: initialData.ngay_cap || "",
      });
    } else {
      setFormData({
        ten_bangcap: "",
        co_quan_cap: "",
        ngay_cap: "",
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
          {initialData ? "Chỉnh sửa bằng cấp/chứng chỉ" : "Thêm bằng cấp/chứng chỉ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên bằng cấp</Form.Label>
            <Form.Control
              type="text"
              name="ten_bangcap"
              value={formData.ten_bangcap}
              onChange={handleChange}
              placeholder="Nhập tên bằng cấp"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cơ quan cấp</Form.Label>
            <Form.Control
              type="text"
              name="co_quan_cap"
              value={formData.co_quan_cap}
              onChange={handleChange}
              placeholder="Nhập cơ quan cấp"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày cấp</Form.Label>
            <Form.Control
              type="date"
              name="ngay_cap"
              value={formData.ngay_cap}
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

export default CertificateModal;
