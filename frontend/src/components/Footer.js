import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        &#169; {new Date().getFullYear()} Stas Vokhmyanin
      </p>
    </footer>
  );
}

export default Footer;
