import React, { useState, useEffect } from 'react'; // Import useState và useEffect

const Message = ({ message, type, resetMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true); // Hiển thị thông báo mới
      const timer = setTimeout(() => {
        setIsVisible(false); // Ẩn thông báo sau 3 giây
        //resetMessage(); // Reset message khi thông báo ẩn đi
      }, 3000);

      return () => clearTimeout(timer); // Dọn dẹp timer khi component bị unmount hoặc thông báo thay đổi
    }
  }, [message, resetMessage]); // Khi message thay đổi, reset lại timer

  if (!message || !isVisible) return null; // Nếu không có message hoặc thông báo đã ẩn, không render

  const messageStyle = type === 'error' ? { color: 'red' } : { color: 'green' };

  return <div style={messageStyle}>{message}</div>;
};

export default Message;
