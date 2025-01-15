import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DepartmentModal = ({ show, onHide, department, onSave, onChange }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{department?.id ? 'Sửa Khoa' : 'Thêm Khoa'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên Khoa</Form.Label>
            <Form.Control
              type="text"
              name="ten_khoa"
              value={department?.ten_khoa || ''}
              onChange={onChange} // Gọi hàm xử lý thay đổi
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
          <Button variant="primary" onClick={() => onSave(department)} style={{ minWidth: '80px' }}>
            Lưu
          </Button>
          <Button variant="secondary" onClick={onHide} style={{ minWidth: '80px' }}>
            Hủy
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DepartmentModal;
