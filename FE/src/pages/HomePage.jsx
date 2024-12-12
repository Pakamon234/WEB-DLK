import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch nội dung từ tệp HTML
    fetch("/index.html")
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error loading HTML:", error));
  }, []);

  return (
    <div>
      {/* Render nội dung HTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    </div>
  );
};

export default HomePage;
