import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CTKhoaModal = ({ show, onHide, ctKhoa, onSave, bacsiOptions = [], khoaOptions = [] }) => {
  const [bacsiId, setBacsiId] = useState('');
  const [khoaId, setKhoaId] = useState('');

  // Cập nhật state khi `ctKhoa` thay đổi
  useEffect(() => {
    if (ctKhoa) {
      setBacsiId(ctKhoa.bacsi_id || ''); // Chỉ cần khi thêm mới
      setKhoaId(ctKhoa.khoa_id || ''); // Luôn cần cho cả thêm và sửa
    } else {
      setBacsiId('');
      setKhoaId('');
    }
  }, [ctKhoa]);

  const handleSave = () => {
    if (!khoaId) {
      alert('Vui lòng chọn khoa.');
      return;
    }
    onSave({
      ...(ctKhoa ? {} : { bacsi_id: bacsiId }), // Chỉ gửi `bacsi_id` khi thêm mới
      khoa_id: khoaId,
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{ctKhoa ? 'Sửa CT Khoa' : 'Thêm CT Khoa'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Dropdown chọn bác sĩ chỉ hiển thị khi thêm mới */}
          {!ctKhoa && (
            <Form.Group className="mb-3">
              <Form.Label>Bác sĩ</Form.Label>
              <Form.Select
                value={bacsiId}
                onChange={(e) => setBacsiId(e.target.value)}
                disabled={bacsiOptions.length === 0}
              >
                <option value="">-- Chọn bác sĩ --</option>
                {bacsiOptions.map((bacsi) => (
                  <option key={bacsi.id} value={bacsi.id}>
                    {`${bacsi.ho} ${bacsi.ten}`}
                  </option>
                ))}
              </Form.Select>
              {bacsiOptions.length === 0 && (
                <small className="text-danger">Danh sách bác sĩ trống.</small>
              )}
            </Form.Group>
          )}

          {/* Dropdown chọn khoa */}
          <Form.Group className="mb-3">
            <Form.Label>Khoa</Form.Label>
            <Form.Select
              value={khoaId}
              onChange={(e) => setKhoaId(e.target.value)}
              disabled={khoaOptions.length === 0}
            >
              <option value="">-- Chọn khoa --</option>
              {khoaOptions.map((khoa) => (
                <option key={khoa.id} value={khoa.id}>
                  {khoa.ten_khoa}
                </option>
              ))}
            </Form.Select>
            {khoaOptions.length === 0 && (
              <small className="text-danger">Danh sách khoa trống.</small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CTKhoaModal;
