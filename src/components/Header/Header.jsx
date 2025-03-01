import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">Coffee App</div>
      <Navigation />
    </header>
  );
}

export default Header;
