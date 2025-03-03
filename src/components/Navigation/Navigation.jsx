import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive ? 'navigation__link navigation__link--active' : 'navigation__link'
            }
          >
            Inicio
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink 
            to="/coffees" 
            className={({isActive}) => 
              isActive ? 'navigation__link navigation__link--active' : 'navigation__link'
            }
          >
            Cafés
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;