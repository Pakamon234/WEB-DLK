import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap

const Message = ({ message, type, resetMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true); // Hiển thị thông báo mới
      const timer = setTimeout(() => {
        setIsVisible(false); // Ẩn thông báo sau 3 giây
        if (resetMessage) {
          resetMessage(); // Reset message khi thông báo ẩn đi
        }
      }, 3000);

      return () => clearTimeout(timer); // Dọn dẹp timer khi component bị unmount hoặc thông báo thay đổi
    }
  }, [message, resetMessage]); // Khi message thay đổi, reset lại timer

  if (!message || !isVisible) return null; // Nếu không có message hoặc thông báo đã ẩn, không render

  const alertType = type === 'error' ? 'alert-danger' : 'alert-success'; // Loại alert (danger hoặc success)

  return (
    <div className={`alert ${alertType} alert-dismissible fade show`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          setIsVisible(false);
          if (resetMessage) {
            resetMessage(); // Reset message khi người dùng đóng alert
          }
        }}
      ></button>
    </div>
  );
};

export default Message;
