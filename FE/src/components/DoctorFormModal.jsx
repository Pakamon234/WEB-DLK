import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./DoctorForm.css";

const DoctorFormModal = ({
  show,
  onHide,
  doctor = {}, // Default to an empty object
  onChange,
  onSave,
  isAddingDoctor,
}) => {
  const [localImage, setLocalImage] = useState(doctor.hinh_anh || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset local image khi doctor thay đổi
    setLocalImage(doctor.hinh_anh || "");
  }, [doctor]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setLocalImage(base64Image);
        onChange({ target: { name: "hinh_anh", value: base64Image } });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!doctor.hoc_ham || doctor.hoc_ham.trim() === "") {
      newErrors.hoc_ham = "Học hàm không được để trống.";
    }
    if (!doctor.ho || doctor.ho.trim() === "") {
      newErrors.ho = "Họ không được để trống.";
    }
    if (!doctor.ten || doctor.ten.trim() === "") {
      newErrors.ten = "Tên không được để trống.";
    }
    if (!doctor.mo_ta || doctor.mo_ta.trim() === "") {
      newErrors.mo_ta = "Mô tả không được để trống.";
    }
    if (!doctor.ngay_bd_hanh_y) {
      newErrors.ngay_bd_hanh_y = "Ngày bắt đầu hành nghề không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Nếu không có ảnh mới, giữ nguyên ảnh cũ
      if (localImage && localImage.startsWith("data:image")) {
        onChange({ target: { name: "hinh_anh", value: localImage } });
      }

      // Đảm bảo gửi hình ảnh
      onSave();
    }
  };

  const handleClose = () => {
    setErrors({}); // Reset lỗi khi đóng modal
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isAddingDoctor ? "Thêm bác sĩ mới" : "Chỉnh sửa bác sĩ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Học hàm</Form.Label>
            <Form.Control
              type="text"
              name="hoc_ham"
              value={doctor.hoc_ham || ""}
              onChange={onChange}
              isInvalid={!!errors.hoc_ham}
            />
            <Form.Control.Feedback type="invalid">
              {errors.hoc_ham}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Họ</Form.Label>
            <Form.Control
              type="text"
              name="ho"
              value={doctor.ho || ""}
              onChange={onChange}
              isInvalid={!!errors.ho}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ho}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="ten"
              value={doctor.ten || ""}
              onChange={onChange}
              isInvalid={!!errors.ten}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ten}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              isInvalid={!!errors.hinh_anh}
            />
            {localImage && (
              <img src={localImage} alt="Preview" className="image-preview mt-2" />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              name="mo_ta"
              value={doctor.mo_ta || ""}
              onChange={onChange}
              isInvalid={!!errors.mo_ta}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mo_ta}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu hành nghề</Form.Label>
            <Form.Control
              type="date"
              name="ngay_bd_hanh_y"
              value={doctor.ngay_bd_hanh_y || ""}
              onChange={onChange}
              isInvalid={!!errors.ngay_bd_hanh_y}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ngay_bd_hanh_y}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={doctor.username || ""}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={doctor.password || ""}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {isAddingDoctor ? "Thêm bác sĩ" : "Lưu thay đổi"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorFormModal;
