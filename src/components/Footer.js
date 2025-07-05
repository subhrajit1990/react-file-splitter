import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      Maintained by <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer">YOUR NAME</a>
    </footer>
  );
};

const footerStyle = {
  marginTop: "40px",
  padding: "15px 10px",
  textAlign: "center",
  fontSize: "0.9rem",
  color: "#666",
  borderTop: "1px solid #ddd",
  backgroundColor: "#f7f7f7"
};

export default Footer;