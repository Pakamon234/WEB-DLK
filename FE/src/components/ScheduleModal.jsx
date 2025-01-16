import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ScheduleModal = ({ show, onHide, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    day_of_week: "",
    gio_bd: "",
    gio_kt: "",
    vang: false,
    ly_do: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        day_of_week: initialData.day_of_week || "",
        gio_bd: initialData.gio_bd || "",
        gio_kt: initialData.gio_kt || "",
        vang: initialData.vang || false,
        ly_do: initialData.ly_do || "",
      });
    } else {
      setFormData({
        day_of_week: "",
        gio_bd: "",
        gio_kt: "",
        vang: false,
        ly_do: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Chỉnh sửa lịch trình" : "Thêm lịch trình"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Ngày trong tuần</Form.Label>
            <Form.Control
              type="text"
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleChange}
              placeholder="Ví dụ: Thứ Hai"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giờ bắt đầu</Form.Label>
            <Form.Control
              type="time"
              name="gio_bd"
              value={formData.gio_bd}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giờ kết thúc</Form.Label>
            <Form.Control
              type="time"
              name="gio_kt"
              value={formData.gio_kt}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Vắng mặt"
              name="vang"
              checked={formData.vang}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lý do</Form.Label>
            <Form.Control
              type="text"
              name="ly_do"
              value={formData.ly_do}
              onChange={handleChange}
              placeholder="Nhập lý do (nếu có)"
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

export default ScheduleModal;
