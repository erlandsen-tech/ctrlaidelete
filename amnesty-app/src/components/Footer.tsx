import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="amnesty-footer">
      <p style={{ fontSize: "0.8rem" }}>
        © {new Date().getFullYear()} Amnesty International Norge
      </p>
    </footer>
  );
};

export default Footer;
