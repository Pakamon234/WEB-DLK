import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    // Chuyển hướng sang tệp index.html
    window.location.href = "/index.html";
  }, []);

  return null; // Không cần render nội dung gì vì đã chuyển hướng
};

export default HomePage;
