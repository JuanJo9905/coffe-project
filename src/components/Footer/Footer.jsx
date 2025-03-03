import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© {currentYear} Coffee App. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;