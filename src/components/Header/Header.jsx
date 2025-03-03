import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">Coffee App</Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;